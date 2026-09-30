import fs from 'fs';
import path from 'path';
import { Product, ProductVariant } from '@/types';
import { SyncedSkuData } from './magento';

export interface LivePriceStore {
  lastSyncedAt: string | null;
  syncedBy: string | null;
  skuCount: number;
  skus: Record<string, SyncedSkuData>;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const PRICES_FILE = path.join(DATA_DIR, 'live_prices.json');

/**
 * Read the current live prices store from data/live_prices.json
 */
export function getLivePriceStore(): LivePriceStore | null {
  try {
    if (!fs.existsSync(PRICES_FILE)) {
      return null;
    }
    const raw = fs.readFileSync(PRICES_FILE, 'utf-8');
    return JSON.parse(raw) as LivePriceStore;
  } catch (err) {
    console.warn('[Pricing] Could not read live_prices.json:', err);
    return null;
  }
}

/**
 * Persist synced Magento prices to data/live_prices.json
 */
export function saveLivePriceStore(
  syncedSkus: Record<string, SyncedSkuData>,
  syncedBy = 'admin'
): LivePriceStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    const store: LivePriceStore = {
      lastSyncedAt: new Date().toISOString(),
      syncedBy,
      skuCount: Object.keys(syncedSkus).length,
      skus: syncedSkus
    };

    fs.writeFileSync(PRICES_FILE, JSON.stringify(store, null, 2), 'utf-8');
    return store;
  } catch (err) {
    console.error('[Pricing] Failed to write live_prices.json:', err);
    throw err;
  }
}

/**
 * Merges live synced prices, cost, and stock quantities onto a product's variants
 */
export function applyLivePricingToProduct(product: Product): Product {
  const store = getLivePriceStore();
  if (!store || !store.skus) {
    return product;
  }

  const updatedVariants: ProductVariant[] = product.variants.map((v) => {
    const liveData = store.skus[v.sku];
    if (!liveData) {
      return v;
    }

    return {
      ...v,
      pricePhp: liveData.price > 0 ? liveData.price : v.pricePhp,
      costPhp: liveData.cost > 0 ? liveData.cost : v.costPhp,
      stock: typeof liveData.qty === 'number' ? liveData.qty : v.stock,
      available: Boolean(liveData.inStock && liveData.qty > 0),
      magentoProductId: liveData.magentoId || v.magentoProductId
    };
  });

  return {
    ...product,
    variants: updatedVariants
  };
}

/**
 * Merges live synced prices onto an array of products
 */
export function applyLivePricingToProducts(products: Product[]): Product[] {
  return products.map(applyLivePricingToProduct);
}
