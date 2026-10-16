import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { fetchAllCarbonProductsFromMagento } from '@/lib/magento';
import { saveLivePriceStore } from '@/lib/pricing';
import { PRODUCTS } from '@/data/products';

function checkAuth(): boolean {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('carbon_admin_session')?.value || cookieStore.get('mw_carbon_session')?.value;
  return Boolean(sessionToken);
}

/**
 * Safely updates src/data/products.ts with new pricePhp, costPhp, and stock values from Magento
 */
function updateProductsDataFile(syncedData: Record<string, any>) {
  try {
    const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.ts');
    if (!fs.existsSync(productsFilePath)) return;

    let content = fs.readFileSync(productsFilePath, 'utf-8');

    for (const [sku, item] of Object.entries(syncedData)) {
      if (!item || !item.price) continue;

      // Regex matching variant block containing this SKU
      // e.g.:
      // sku: 'Product16926',
      // costPhp: 18800,
      // pricePhp: 23500,
      // stock: 10,
      const skuPattern = new RegExp(
        `(sku:\\s*['"]${sku}['"][\\s\\S]*?)(costPhp:\\s*\\d+)(,[\\s\\S]*?)(pricePhp:\\s*\\d+)(,[\\s\\S]*?)(stock:\\s*\\d+)`,
        'm'
      );

      if (skuPattern.test(content)) {
        content = content.replace(
          skuPattern,
          `$1costPhp: ${Math.round(item.cost || 0)}$3pricePhp: ${Math.round(item.price || 0)}$5stock: ${Math.round(item.qty || 0)}`
        );
      }
    }

    fs.writeFileSync(productsFilePath, content, 'utf-8');
  } catch (err) {
    console.error('[sync-prices] Failed to update products.ts file:', err);
  }
}

export async function POST(req: Request) {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Fetch live data for all 11 SKUs from Magento 2 REST API
    const syncedData = await fetchAllCarbonProductsFromMagento();
    const fetchedCount = Object.keys(syncedData).length;

    if (fetchedCount === 0) {
      return NextResponse.json(
        { error: 'Could not connect to Magento 2 API or no products returned.' },
        { status: 502 }
      );
    }

    // 2. Persist to storage (in-memory + /tmp or data directory)
    let store: any;
    try {
      store = saveLivePriceStore(syncedData, 'admin');
    } catch (saveErr: any) {
      console.warn('[sync-prices] saveLivePriceStore caught:', saveErr?.message);
      store = {
        lastSyncedAt: new Date().toISOString(),
        syncedBy: 'admin',
        skuCount: fetchedCount,
        skus: syncedData
      };
    }

    // 3. Update src/data/products.ts permanently if in local dev
    try {
      updateProductsDataFile(syncedData);
    } catch (updateErr: any) {
      console.warn('[sync-prices] updateProductsDataFile caught:', updateErr?.message);
    }

    // 4. Build response array
    const updatedItems = Object.values(syncedData).map((p) => {
      const marginPhp = p.price - p.cost;
      const marginPct = p.price > 0 ? ((marginPhp / p.price) * 100).toFixed(1) : '0.0';
      return {
        sku: p.sku,
        magentoId: p.magentoId,
        name: p.name,
        price: p.price,
        cost: p.cost,
        marginPhp,
        marginPct,
        qty: p.qty,
        inStock: p.inStock,
        lastFetchedAt: p.lastFetchedAt
      };
    });

    return NextResponse.json({
      success: true,
      message: `Successfully synchronized ${fetchedCount} Champagne Carbon products from Manila Wine Magento 2 API.`,
      updatedCount: fetchedCount,
      lastSyncedAt: store.lastSyncedAt,
      items: updatedItems
    });
  } catch (err: any) {
    console.error('[POST /api/admin/sync-prices] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to sync prices from Magento API' },
      { status: 500 }
    );
  }
}
