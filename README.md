# Champagne Carbon Philippines — Manila Wine Mini-Website

Exclusive luxury eCommerce portal and private client allocation system for **Champagne Carbon** in the Philippines, hosted under `champagne-carbon.manila-wine.com`.

---

## Key Features

1. **Brand Identity & Aesthetic**
   - Direct high-fidelity aesthetic adaptation from [Champagne Carbon](https://www.champagnecarbon.com/).
   - Dark aerospace carbon-fiber weave theme with gold and silver accents.
   - Integrated Manila Wine co-branding as the **Sole Authorized Custodian in the Philippines**.
   - Rich editorial storytelling drawn from the official brand deck (37 handcrafted steps of carbon fiber, oak cellars in Champillon, Bugatti collaboration, and Formula 1 podium heritage).

2. **Catalog & Magento 2 Integration**
   - Cuvée range: Carbon Brut, Rosé, Blanc de Noirs Vintage 2009, Blanc de Blancs Grand Cru 2019, ƎB.01 Vintage 2002, ƎB.02 Chiron 300+, Bolide Vintage 2017.
   - **Format Selector**: Bottle (75 cl), Magnum (1.5 L), Jeroboam (3 L).
   - **Individual SKUs**: Every volume variation maps to a distinct Magento Simple Product SKU (no configurable products).
   - **Seamless Cart Handoff**: Clicking **"ADD TO CART (MANILA WINE)"** opens `manila-wine.com` in a new tab (`target="_blank"`) injecting the item into the Manila Wine cart.
   - **Personalisation Removed**: Per instructions, all personalisation options and tabs have been eliminated.

3. **Mini-Admin & Brevo VIP Dispatcher (`/admin`)**
   - Protected with administrator credentials (`admin` / `13*Q6$_u@Oam6-`).
   - Connected directly to Manila Wine's Brevo account (`contact@manila-wine.com`).
   - Live responsive dark-luxury HTML email preview.
   - One-click test email dispatcher to any inbox.
   - Bulk VIP recipient parser with automated deduplication and batch campaign blast.

---

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Or build & run production server
npm run build
npx next start -p 3005
```

---

## Updating SKUs, Prices & Bottle Availability

All catalog data is centrally organized in:
`src/data/products.ts`

Each product variant has:
```typescript
{
  format: "Bottle 75 cl",
  volume: "750ml",
  sku: "MW-CARB-BDN09-750",      // Set your Magento Simple Product SKU here
  magentoProductId: 12345,        // Optional: Numeric Magento entity ID
  pricePhp: 32000,                // Estimated allocation in PHP
  available: true                 // Toggle in/out of stock
}
```

---

## Deployment (Same as jwlimited.manila-wine.com)

1. Connect the repository to **Vercel**.
2. Add the custom domain: `champagne-carbon.manila-wine.com`.
3. In DNS, configure the CNAME record:
   - Type: `CNAME`
   - Host: `champagne-carbon`
   - Value: `cname.vercel-dns.com`
4. Configure environment variables in Vercel project settings (from `.env.example`).
