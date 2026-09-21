const fs = require('fs');
const https = require('https');
const path = require('path');

const html = fs.readFileSync('src/data/carbon_home.html', 'utf8');

// Find logo and header
const headerMatch = html.match(/<header[\\s\\S]*?<\/header>/i);
if (headerMatch) {
  fs.writeFileSync('src/data/carbon_header.html', headerMatch[0]);
  console.log('Header saved, length:', headerMatch[0].length);
}


// Find all cdn shopify urls
const regex = /https:\/\/www\.champagnecarbon\.com\/cdn\/shop\/[^\s'�\r\n]+/g;
let m; const urls = new Set();
while ((m = regex.exec(html)) !== null) {
  urls.add(m[0].replace(/&amp;/g, '&'));
}

// Also regex for protocol-relative cdn urls
const regEx2 = /\/\/www\.champagnecarbon\.com\/cdn\/shop\/[^\s'�r\n]+/g;
while ((m = regEx2.exec(html)) !== null) {
  urls.add('https:' + m[0].replace(/&amp;/g, '&'));
}

console.log('Total urls found:', urls.size);
fs.writeFileSync('src/data/carbon_urls.json', JSON.stringify(Array.from(urls), null, 2));
