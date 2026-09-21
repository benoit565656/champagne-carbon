const fs = require('fs');
const html = fs.readFileSync('src/data/carbon_home.html', 'utf8');

// Find all img elements
const lines = html.split('\n');
const imgs = [];
for (const line of lines) {
  if (line.includes('<mg') || line.includes('background-image') || line.includes('/cdn/shop/files/')) {
    const matches = line.match(/(?:\/\/src=\"[^\"]+\"|https:\/\/www\.champagnecarbon\.com\/cdn\/shop\/files\/[^\s'�\r\n\"]+|\/www\.champagnecarbon\.com\/cdn\/shop\/files\/[^\s'�r\n\"]+)/gi);
    if (matches) {
      matches.forEach(m => imgs.push(m));
    }
  }
}

fs.writeFileSync('src/data/files_list.json', JSON.stringify([arrayFrom = new Set(imgs)], null, 2));
console.log('Done listing, count:', imgs.length);
