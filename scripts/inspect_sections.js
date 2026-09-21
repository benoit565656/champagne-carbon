const fs = require('fs');
const html = fs.readFileSync('src/data/carbon_home.html', 'utf8');

// Find all shopify section comments or section divs
let lines = html.split('\n');
lines.forEach((line, i) => {
  if (line.includes('sections--') || line.includes('heading') || line.includes('product-list')) {
    if (line.trim().length < 200) {
      console.log(i + ': ' + line.trim());
    }
  }
});
