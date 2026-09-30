import https from 'https';

export const MAGENTO_SKUS = [
  'Product16903',
  'Product16917',
  'Product16918',
  'Product16919',
  'Product16920',
  'Product16921',
  'Product16922',
  'Product16923',
  'Product16924',
  'Product16925',
  'Product16926'
] as const;

export type MagentoSku = typeof MAGENTO_SKUS[number];

export interface MagentoProductResponse {
  id: number;
  sku: string;
  name: string;
  price: number;
  status: number;
  type_id: string;
  custom_attributes?: Array<{
    attribute_code: string;
    value: any;
  }>;
}

export interface MagentoStockResponse {
  item_id: number;
  product_id: number;
  qty: number;
  is_in_stock: boolean;
}

export interface SyncedSkuData {
  sku: string;
  magentoId: number;
  name: string;
  price: number;
  cost: number;
  qty: number;
  inStock: boolean;
  urlKey?: string;
  lastFetchedAt: string;
}

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

function getMagentoConfig() {
  const baseUrl = (process.env.MAGENTO_BASE_URL || 'https://manila-wine.com/rest/V1').replace(/\/+$/, '');
  const token = (process.env.MAGENTO_INTEGRATION_TOKEN || '8c9b0s4xxkadcgdwzvum6uya4tdbj3qo').trim();

  // Extract hostname and path prefix
  const urlObj = new URL(baseUrl);
  return {
    hostname: urlObj.hostname,
    basePath: urlObj.pathname,
    token
  };
}

async function magentoRequest<T>(endpointPath: string): Promise<T | null> {
  const config = getMagentoConfig();
  const fullPath = `${config.basePath}${endpointPath}`;

  return new Promise((resolve, reject) => {
    const options: https.RequestOptions = {
      hostname: config.hostname,
      path: fullPath,
      method: 'GET',
      agent: httpsAgent,
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'User-Agent': 'ChampagneCarbon-Minisite/1.0',
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(body) as T);
          } catch (err) {
            reject(new Error(`Failed to parse Magento JSON response from ${fullPath}`));
          }
        } else {
          resolve(null);
        }
      });
    });

    req.on('error', (err) => {
      console.error(`[Magento API] Request failed for ${fullPath}:`, err.message);
      resolve(null);
    });

    req.setTimeout(12000, () => {
      req.destroy();
      resolve(null);
    });

    req.end();
  });
}

/**
 * Fetch product data & inventory for a single SKU from Manila Wine Magento 2 API
 */
export async function fetchMagentoProductBySku(sku: string): Promise<SyncedSkuData | null> {
  try {
    const [product, stock] = await Promise.all([
      magentoRequest<MagentoProductResponse>(`/products/${encodeURIComponent(sku)}`),
      magentoRequest<MagentoStockResponse>(`/stockItems/${encodeURIComponent(sku)}`)
    ]);

    if (!product) return null;

    const costAttr = product.custom_attributes?.find(a => a.attribute_code === 'cost')?.value;
    const urlKeyAttr = product.custom_attributes?.find(a => a.attribute_code === 'url_key')?.value;
    const cost = costAttr ? parseFloat(String(costAttr)) : 0;

    return {
      sku: product.sku,
      magentoId: product.id,
      name: product.name,
      price: product.price || 0,
      cost: isNaN(cost) ? 0 : cost,
      qty: stock ? Number(stock.qty) : 0,
      inStock: stock ? Boolean(stock.is_in_stock) : false,
      urlKey: urlKeyAttr ? String(urlKeyAttr) : undefined,
      lastFetchedAt: new Date().toISOString()
    };
  } catch (err) {
    console.error(`[Magento API] Error fetching SKU ${sku}:`, err);
    return null;
  }
}

/**
 * Fetch all 11 Champagne Carbon SKUs concurrently from Manila Wine Magento 2 API
 */
export async function fetchAllCarbonProductsFromMagento(): Promise<Record<string, SyncedSkuData>> {
  const results: Record<string, SyncedSkuData> = {};

  const promises = MAGENTO_SKUS.map(async (sku) => {
    const data = await fetchMagentoProductBySku(sku);
    if (data) {
      results[sku] = data;
    }
  });

  await Promise.all(promises);
  return results;
}
