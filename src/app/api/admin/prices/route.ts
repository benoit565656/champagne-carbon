import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLivePriceStore, saveLivePriceStore } from '@/lib/pricing';
import { fetchAllCarbonProductsFromMagento, MAGENTO_SKUS } from '@/lib/magento';
import { PRODUCTS } from '@/data/products';

function checkAuth(): boolean {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('carbon_admin_session')?.value;
  return Boolean(sessionToken);
}

export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const store = getLivePriceStore();

    // Flatten all variants across products to build the mapped inventory table
    const mappedItems: any[] = [];

    PRODUCTS.forEach((product) => {
      product.variants.forEach((v) => {
        const liveData = store?.skus[v.sku];
        const currentPrice = v.pricePhp;
        const magentoPrice = liveData ? liveData.price : v.pricePhp;
        const cost = liveData ? liveData.cost : v.costPhp;
        const stock = liveData ? liveData.qty : v.stock;
        const inStock = liveData ? liveData.inStock : v.available;

        const marginPhp = magentoPrice - cost;
        const marginPct = magentoPrice > 0 ? ((marginPhp / magentoPrice) * 100).toFixed(1) : '0.0';

        mappedItems.push({
          sku: v.sku,
          magentoId: liveData?.magentoId || v.magentoProductId,
          productTitle: product.title,
          variantFormat: v.format,
          productName: v.productName,
          slug: product.slug,
          minisitePrice: currentPrice,
          magentoPrice: magentoPrice,
          cost: cost,
          marginPhp: marginPhp,
          marginPct: marginPct,
          stock: stock,
          inStock: inStock,
          link: v.link,
          presentationType: v.presentationType,
          isLuminous: v.isLuminous,
          isAligned: currentPrice === magentoPrice,
          lastFetchedAt: liveData?.lastFetchedAt || store?.lastSyncedAt || null
        });
      });
    });

    return NextResponse.json({
      success: true,
      lastSyncedAt: store?.lastSyncedAt || null,
      syncedBy: store?.syncedBy || null,
      totalSkus: mappedItems.length,
      items: mappedItems
    });
  } catch (err: any) {
    console.error('[GET /api/admin/prices] Error:', err);
    return NextResponse.json({ error: err.message || 'Failed to get prices' }, { status: 500 });
  }
}
