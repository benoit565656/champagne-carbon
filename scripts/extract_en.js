const fs = require('fs');
const html = fs.readFileSync('src/data/carbon_en.html', 'utf8');

// Find all headings
const hRegex = /<h[1-5][^>]*>(.*?)<\/h[1-5]>/gi;
let m;
const headings = [];
while ((m = hRegex.exec(html)) !== null) {
  headings.push(m[1].replace(/<[^>]+>/g, '').trim());
}
console.log('--- HEADINGS IN EN ---');
console.log(headings);

// Check hero section text
const heroIdx = html.indexOf('carbon-hero-slide');
if (heroIdx !== -1) {
  console.log('--- HERO SECTION ---');
  console.log(html.slice(heroIdx, heroIdx + 1200).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

// Check vineyard overlay text
const vineyardIdx = html.indexOf('carbon-vineyard-overlay');
if (vineyardIdx !== -1) {
  console.log('--- VINEYARD OVERLAY ---');
  console.log(html.slice(vineyardIdx, vineyardIdx + 800).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

// Check coffret text
const coffretIdx = html.indexOf('COFFRET');
if (coffretIdx !== -1) {
  console.log('--- COFFRET ---');
  console.log(html.slice(coffretIdx - 100, coffretIdx + 500).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

// Check promise text
const promiseIdx = html.indexOf('carbon-our-promise');
if (promiseIdx !== -1) {
  console.log('--- OUR PROMISE ---');
  console.log(html.slice(promiseIdx, promiseIdx + 1200).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

// Check recognition strip
const recogIdx = html.indexOf('carbon-recognition-strip');
if (recogIdx !== -1) {
  console.log('--- RECOGNITION STRIP ---');
  console.log(html.slice(recogIdx, recogIdx + 800).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}
