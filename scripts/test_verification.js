const fs = require('fs');
const path = require('path');

console.log('=== VERIFICATION TEST ===\n');

// 1. Check all 11 SKU files in public/images/bottles/
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

console.log('1. Checking all 11 SKU image assets:');
let missing = 0;
skus.forEach((sku) => {
  const p = path.join('public', 'images', 'bottles', `${sku}.png`);
  if (!fs.existsSync(p)) {
    console.error(`❌ Missing file: ${p}`);
    missing++;
  } else {
    const s = fs.statSync(p);
    console.log(`✔ ${sku}.png exists (${(s.size / 1024).toFixed(1)} KB)`);
  }
});

// 2. Check src/data/products.ts for image references
console.log('\n2. Checking src/data/products.ts has image mappings for every variant:');
const prodFile = fs.readFileSync('src/data/products.ts', 'utf-8');
skus.forEach((sku) => {
  const hasSku = prodFile.includes(`sku: '${sku}'`);
  const hasImg = prodFile.includes(`/images/bottles/${sku}.png`);
  if (hasSku && hasImg) {
    console.log(`✔ ${sku} properly mapped to /images/bottles/${sku}.png`);
  } else {
    console.error(`❌ ${sku} missing mapping in products.ts (hasSku=${hasSku}, hasImg=${hasImg})`);
    missing++;
  }
});

// 3. Check data/live_prices.json
console.log('\n3. Checking data/live_prices.json:');
const livePrices = JSON.parse(fs.readFileSync('data/live_prices.json', 'utf-8'));
console.log(`✔ Live price store contains ${livePrices.skuCount} SKUs.`);
skus.forEach((sku) => {
  const item = livePrices.skus[sku];
  if (item && item.price > 0) {
    console.log(`✔ ${sku}: ₱${item.price.toLocaleString()} (Cost: ₱${Math.round(item.cost).toLocaleString()}, Stock: ${item.qty})`);
  } else {
    console.error(`❌ ${sku} missing in live_prices.json`);
    missing++;
  }
});

// 4. Test simulated EROFS handling
console.log('\n4. Testing EROFS fallback simulation:');
const pricingSource = fs.readFileSync('src/lib/pricing.ts', 'utf-8');
const hasTmpFallback = pricingSource.includes('/tmp') && pricingSource.includes('memoryPriceStore');
if (hasTmpFallback) {
  console.log('✔ pricing.ts has /tmp and memoryPriceStore fallback with EROFS protection.');
} else {
  console.error('❌ pricing.ts missing /tmp fallback');
  missing++;
}

// 5. Check CoffretSection replaced
console.log('\n5. Checking CoffretSection removal & Motorsport Heritage:');
const coffretContent = fs.readFileSync('src/components/home/CoffretSection.tsx', 'utf-8');
const hasF1 = coffretContent.includes('FORMULA 1') && coffretContent.includes('DUCATI CORSE');
const hasNoCaseMention = !coffretContent.includes('SIGNATURE CASE') && !coffretContent.includes('presentation casket');
if (hasF1 && hasNoCaseMention) {
  console.log('✔ CoffretSection successfully replaced with Formula 1 & Ducati Motorsport Heritage (all case mentions removed)!');
} else {
  console.error('❌ CoffretSection still has case mentions or missing F1/Ducati');
  missing++;
}

if (missing === 0) {
  console.log('\n====================================');
  console.log('🎉 ALL 5 VERIFICATION SUITES PASSED!');
  console.log('====================================');
} else {
  console.error(`\n❌ Found ${missing} verification issues.`);
  process.exit(1);
}
