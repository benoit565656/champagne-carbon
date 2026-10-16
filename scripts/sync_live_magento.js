const fs = require('fs');
const https = require('https');

const token = '8c9b0s4xxkadcgdwzvum6uya4tdbj3qo';
const agent = new https.Agent({ rejectUnauthorized: false });

const skus = [
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
];

async function syncAll() {
  const syncedData = {};

  for (const sku of skus) {
    await new Promise((resolve) => {
      const options = {
        hostname: 'manila-wine.com',
        path: '/rest/V1/products/' + sku,
        method: 'GET',
        agent: agent,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      };
      https.get(options, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const j = JSON.parse(data);
            const costAttr = j.custom_attributes
              ? j.custom_attributes.find((a) => a.attribute_code === 'cost')
              : null;
            const cost = costAttr
              ? parseFloat(costAttr.value)
              : j.price
              ? j.price * 0.7
              : 0;

            syncedData[sku] = {
              sku: j.sku,
              magentoId: j.id,
              name: j.name,
              price: j.price,
              cost: cost,
              qty: 1,
              inStock: j.status === 1,
              urlKey: '',
              lastFetchedAt: new Date().toISOString()
            };
          } catch (e) {
            console.error(sku, e.message);
          }
          resolve();
        });
      });
    });
  }

  // Stock
  for (const sku of skus) {
    const item = syncedData[sku];
    if (!item) continue;
    await new Promise((resolve) => {
      const options = {
        hostname: 'manila-wine.com',
        path: '/rest/V1/stockItems/' + item.magentoId,
        method: 'GET',
        agent: agent,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      };
      https.get(options, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const s = JSON.parse(data);
            if (typeof s.qty === 'number') item.qty = s.qty;
            if (typeof s.is_in_stock === 'boolean') item.inStock = s.is_in_stock;
          } catch (e) {}
          resolve();
        });
      });
    });
  }

  const store = {
    lastSyncedAt: new Date().toISOString(),
    syncedBy: 'admin',
    skuCount: Object.keys(syncedData).length,
    skus: syncedData
  };

  fs.writeFileSync('data/live_prices.json', JSON.stringify(store, null, 2), 'utf-8');
  console.log('Saved data/live_prices.json with', store.skuCount, 'items.');

  // Update src/data/products.ts
  let prodContent = fs.readFileSync('src/data/products.ts', 'utf-8');
  for (const [sku, p] of Object.entries(syncedData)) {
    const skuPattern = new RegExp(
      '(sku:\\s*[\'"]' + sku + '[\'"][\\s\\S]*?)(costPhp:\\s*\\d+)(,[\\s\\S]*?)(pricePhp:\\s*\\d+)(,[\\s\\S]*?)(stock:\\s*\\d+)',
      'm'
    );
    if (skuPattern.test(prodContent)) {
      prodContent = prodContent.replace(
        skuPattern,
        `$1costPhp: ${Math.round(p.cost)}$3pricePhp: ${Math.round(p.cost > 0 && p.price ? p.price : 0)}$5stock: ${Math.round(p.qty)}`
      );
    }
  }
  fs.writeFileSync('src/data/products.ts', prodContent, 'utf-8');
  console.log('Updated src/data/products.ts with new prices & stocks.');
}

syncAll();
