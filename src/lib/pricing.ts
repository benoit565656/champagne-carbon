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

// Global in-memory cache to guarantee persistence across serverless invocations within the same container
let memoryPriceStore: LivePriceStore | null = null;

function getCandidateFilePaths(): string[] {
  const paths: string[] = [];
  
  // On Vercel or AWS Lambda Linux containers, /tmp is always writable
  if (process.platform === 'linux' || process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    paths.push('/tmp/live_prices.json');
  }

  // Standard project path
  paths.push(path.join(process.cwd(), 'data', 'live_prices.json'));
  
  // Fallback to OS temp directory (works on Windows & Linux)
  const osTmp = process.env.TEMP || process.env.TMP || '/tmp';
  const tmpPath = path.join(osTmp, 'live_prices.json');
  if (!paths.includes(tmpPath)) {
    paths.push(tmpPath);
  }

  return paths;
}

/**
 * Read the current live prices store from in-memory cache, /tmp, or data/live_prices.json
 */
export function getLivePriceStore(): LivePriceStore | null {
  if (memoryPriceStore) {
    return memoryPriceStore;
  }

  const candidatePaths = getCandidateFilePaths();

  for (const filePath of candidatePaths) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(raw) as LivePriceStore;
        if (parsed && parsed.skus) {
          memoryPriceStore = parsed;
          return memoryPriceStore;
        }
      }
    } catch (err) {
      // Continue searching next candidate path
    }
  }

  return null;
}

/**
 * Persist synced Magento prices safely (in-memory + filesystem with EROFS protection)
 */
export function saveLivePriceStore(
  syncedSkus: Record<string, SyncedSkuData>,
  syncedBy = 'admin'
): LivePriceStore {
  const store: LivePriceStore = {
    lastSyncedAt: new Date().toISOString(),
    syncedBy,
    skuCount: Object.keys(syncedSkus).length,
    skus: syncedSkus
  };

  // Always update memory store immediately
  memoryPriceStore = store;

  const candidatePaths = getCandidateFilePaths();

  let savedToFile = false;
  for (const filePath of candidatePaths) {
    try {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, JSON.stringify(store, null, 2), 'utf-8');
      savedToFile = true;
      break; // Successfully saved to writable path
    } catch (err: any) {
      // If EROFS (read-only file system) or EACCES, skip and try next path (e.g. /tmp)
      console.warn(`[Pricing] Could not write to ${filePath} (${err.code || err.message}). Attempting next storage target...`);
    }
  }

  if (!savedToFile) {
    console.warn('[Pricing] Could not persist to disk, retained safely in memory store.');
  }

  return store;
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
