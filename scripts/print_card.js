const fs = require('fs');
const html = fs.readFileSync('src/data/carbon_en.html', 'utf8');

const regex = /<product-card[\s\S]*?<\/product-card>/i;
const match = html.match(regex);
if (match) {
  console.log(match[0]);
}
