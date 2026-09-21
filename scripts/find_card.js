const fs = require('fs');
const html = fs.readFileSync('src/data/carbon_en.html', 'utf8');

const regex = /<product-card[\s\S]*?<\/product-card>/i;
const match = html.match(regex);
if (match) {
  console.log('--- FOUND PRODUCT CARD ---');
  console.log(match[0].slice(0, 1500));
} else {
  const cardMatch = html.match(/class=[\"'][^\"']*product-card[^\"']*[\"'][\s\S]*?<\/div>\s*<\/div>/i);
  if (cardMatch) {
    console.log('--- FOUND CLASS PRODUCT CARD ---');
    console.log(cardMatch[0].slice(0, 1500));
  }
}
