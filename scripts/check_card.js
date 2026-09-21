const fs = require('fs');
const html = fs.readFileSync('src/data/carbon_en.html', 'utf8');

const idx = html.indexOf('product-card');
if (idx !== -1) {
  console.log('--- PRODUCT CARD HTML ---');
  console.log(html.slice(idx, idx + 1500));
}
