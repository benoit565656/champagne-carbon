import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  // 1. Carbon Brut (3 presentations: Product16903, Product16920, Product16926)
  {
    id: 'carbon-brut',
    slug: 'carbon-brut',
    title: 'Champagne Carbon Brut',
    subtitle: 'Signature Grand Cru Cuvée',
    category: 'cuvee',
    vintage: 'Multi-Vintage Grand Cru',
    tagline: 'The purest synthesis of Champillon terroir, aged in traditional oak barrels and encased in carbon fiber.',
    overview: 'Composed of 46% Chardonnay, 24% Pinot Noir, and 30% Meunier from prestigious terroirs in Champagne. The initial vintage is aged for an average of 6 years on lees, developing remarkable depth, toasted nuance, and exceptional vinous freshness. Available in both genuine handcrafted carbon fiber and illuminated party presentations.',
    specifications: {
      vintage: 'Multi-Vintage',
      grapeVarieties: '46% Chardonnay, 24% Pinot Noir, 30% Meunier',
      classification: 'Grand Cru & Premier Cru Terroirs',
      aging: '6 years on lees in traditional oak barrels',
      dosage: '7 g/L — Brut',
      alcohol: '12.0% vol',
      cellarMasterNote: 'Rich, gastronomic texture balanced by a razor-sharp mineral backbone and ultra-fine persistence.'
    },
    tastingNotes: {
      eye: 'Pale shimmering gold with light emerald hues and persistent, micro-beaded effervescence.',
      nose: 'White flowers, crisp green apple, roasted brioche, dried fruit, and a delicate touch of smokiness.',
      palate: 'Harmonious attack of citrus and white peach, evolving into creamy praline, hazelnut, and an enduring saline finish.',
      pairings: 'Caviar Oscietra, Pan-seared Turbot, Jamón Ibérico de Bellota, or aged Comté.',
      scoreAwards: '92 Points — Decanter World Wine Awards'
    },
    images: [
      '/images/bottles/carbon-brut-1.png',
      '/images/bottles/carbon-brut-2.png',
      '/images/bottles/carbon-brut-3.png',
      '/images/bottles/carbon-brut-4.png',
      '/images/bottles/carbon-brut-5.png',
      '/images/bottles/carbon-brut-6.png',
      '/images/bottles/carbon-brut-7.png'
    ],
    variants: [
      {
        format: 'Luminous Sleeve 750ml',
        volume: '750ml',
        sku: 'Product16926',
        magentoProductId: 16926,
        productName: 'Champagne Carbon Brut Luminous – Carbon-Look Sleeve 750ml',
        costPhp: 18800,
        pricePhp: 23500,
        stock: 10,
        link: 'https://manila-wine.com/carbon-sleeve-brut-luminous-750ml-champagne',
        presentationType: 'carbon-sleeve-luminous',
        isLuminous: true,
        available: true
      },
      {
        format: 'Luminous Sleeve Magnum 1.5L',
        volume: '1.5L',
        sku: 'Product16920',
        magentoProductId: 16920,
        productName: 'Champagne Carbon Brut Luminous – Carbon-Look Sleeve Magnum 1.5L',
        costPhp: 29500,
        pricePhp: 36875,
        stock: 1,
        link: 'https://manila-wine.com/carbon-sleeve-brut-luminous-1-5l-champagne',
        presentationType: 'carbon-sleeve-luminous',
        isLuminous: true,
        available: true
      },
      {
        format: 'Handcrafted 750ml',
        volume: '750ml',
        sku: 'Product16903',
        magentoProductId: 16903,
        productName: 'Champagne Carbon Brut – Handcrafted Carbon Fibre Bottle 750ml',
        costPhp: 25000,
        pricePhp: 31250,
        stock: 1,
        link: 'https://manila-wine.com/carbon-hand-made-brut-champagne',
        presentationType: 'handcrafted-carbon',
        isLuminous: false,
        available: true
      }
    ]
  },

  // 2. Carbon Rosé (3 presentations: Product16917, Product16921, Product16925)
  {
    id: 'carbon-rose',
    slug: 'carbon-rose',
    title: 'Champagne Carbon Rosé',
    subtitle: 'Prestige Grand Cru Rosé',
    category: 'cuvee',
    vintage: 'Multi-Vintage Grand Cru',
    tagline: 'An opulent harmony of Grand Cru Pinot Noir and Chardonnay, sealed in luminous salmon-tinted carbon.',
    overview: 'A masterclass blend of 50% Chardonnay, 25% Pinot Noir, and 25% Meunier, blended with vinified Grand Cru red wine from Montagne de Reims. Aged 5 years in centuries-old chalk cellars. A sensual, tactile champagne with intense red berry aromatics and an unforgettable salmon-pink hue.',
    specifications: {
      vintage: 'Multi-Vintage',
      grapeVarieties: '50% Chardonnay, 25% Pinot Noir, 25% Meunier (with 15% red wine coteaux)',
      classification: 'Grand Cru & Premier Cru',
      aging: '5 years on lees in chalk cellars',
      dosage: '8 g/L — Brut Rosé',
      alcohol: '12.0% vol',
      cellarMasterNote: 'Vibrant and delicate with silky red fruit presence and crystalline mineral balance.'
    },
    tastingNotes: {
      eye: 'Deep coral pink with intense salmon highlights and micro-beaded effervescence.',
      nose: 'Wild strawberries, redcurrant, pink grapefruit zest, and subtle hints of violet and sweet spice.',
      palate: 'Generous and silky with vibrant red berry intensity, crushed pomegranate, and an energetic, citrus-driven finish.',
      pairings: 'Bluefin tuna tartare, wild salmon sashimi, duck breast with berry reduction, or strawberry pavlova.',
      scoreAwards: '93 Points — Gilbert & Gaillard International Challenge'
    },
    images: [
      '/images/bottles/carbon-rose-1.png',
      '/images/bottles/carbon-rose-2.png',
      '/images/bottles/carbon-rose-3.png',
      '/images/bottles/carbon-rose-4.png',
      '/images/bottles/carbon-rose-5.png',
      '/images/bottles/carbon-rose-6.png',
      '/images/bottles/carbon-rose-7.png'
    ],
    variants: [
      {
        format: 'Luminous Sleeve 750ml',
        volume: '750ml',
        sku: 'Product16925',
        magentoProductId: 16925,
        productName: 'Champagne Carbon Rosé Luminous – Carbon-Look Sleeve 750ml',
        costPhp: 21000,
        pricePhp: 26250,
        stock: 9,
        link: 'https://manila-wine.com/carbon-sleeve-rose-luminous-750ml-champagne',
        presentationType: 'carbon-sleeve-luminous',
        isLuminous: true,
        available: true
      },
      {
        format: 'Luminous Sleeve Magnum 1.5L',
        volume: '1.5L',
        sku: 'Product16921',
        magentoProductId: 16921,
        productName: 'Champagne Carbon Rosé Luminous – Carbon-Look Sleeve Magnum 1.5L',
        costPhp: 34000,
        pricePhp: 42500,
        stock: 1,
        link: 'https://manila-wine.com/carbon-sleeve-rose-luminous-1-5l-champagne',
        presentationType: 'carbon-sleeve-luminous',
        isLuminous: true,
        available: true
      },
      {
        format: 'Handcrafted 750ml',
        volume: '750ml',
        sku: 'Product16917',
        magentoProductId: 16917,
        productName: 'Champagne Carbon Rosé – Handcrafted Carbon Fibre Bottle 750ml',
        costPhp: 32000,
        pricePhp: 40000,
        stock: 1,
        link: 'https://manila-wine.com/carbon-hand-made-rose-champagne',
        presentationType: 'handcrafted-carbon',
        isLuminous: false,
        available: true
      }
    ]
  },

  // 3. Bugatti EB.01 Vintage 2002 (2 presentations: Product16924, Product16922)
  {
    id: 'carbon-eb01-bugatti-vintage-2002',
    slug: 'eb01-bugatti-vintage-2002',
    title: 'Champagne Carbon × Bugatti EB.01 Vintage 2002',
    subtitle: 'Celebration of Bugatti’s 110th Anniversary',
    category: 'bugatti',
    vintage: '2002 Vintage',
    tagline: 'An exceptional 2002 vintage celebrating 110 years of Bugatti engineering and heritage.',
    overview: 'Created to honor Bugatti’s 110th anniversary, the EB.01 is a blend of 90% Chardonnay and 10% Pinot Noir from the legendary 2002 harvest in Champagne. Matured for over 15 years in Carbon’s deepest chalk cellars, it showcases incredible complexity, hazelnuts, candied citrus, and a racing blue carbon fiber weave inspired by the Bugatti Chiron.',
    specifications: {
      vintage: '2002',
      grapeVarieties: '90% Chardonnay, 10% Pinot Noir',
      classification: 'Grand Cru Terroirs',
      aging: '15 years on lees in oak barrels & cellars',
      dosage: '6 g/L — Extra Brut',
      alcohol: '12.5% vol',
      cellarMasterNote: 'The 2002 millésime is widely regarded as one of the greatest Champagne harvests in modern history.'
    },
    tastingNotes: {
      eye: 'Deep luminous gold with bronze sparks and creamy, persistent effervescence.',
      nose: 'Dried apricots, candied lemon peel, toasted almond, roasted hazelnut, and hints of gingerbread.',
      palate: 'Magnificent volume and richness, driven by vibrant acidity, dried citrus, tobacco leaf, and a noble mineral cadence.',
      pairings: 'Roasted guinea fowl with chanterelles, white truffle risotto, or 36-month aged Parmigiano-Reggiano.',
      scoreAwards: '95 Points — International Sommelier Review'
    },
    images: [
      '/images/bottles/eb-01-bugatti-vintage-2002-1.png',
      '/images/bottles/eb-01-bugatti-vintage-2002-2.jpg',
      '/images/bottles/eb-01-bugatti-vintage-2002-3.png',
      '/images/bottles/eb-01-bugatti-vintage-2002-4.png',
      '/images/bottles/eb-01-bugatti-vintage-2002-5.png',
      '/images/bottles/eb-01-bugatti-vintage-2002-6.png'
    ],
    variants: [
      {
        format: 'Luminous Sleeve 750ml',
        volume: '750ml',
        sku: 'Product16922',
        magentoProductId: 16922,
        productName: 'Champagne Carbon x Bugatti EB01 Vintage 2002 Luminous – Carbon-Look Sleeve 750ml',
        costPhp: 23000,
        pricePhp: 28750,
        stock: 1,
        link: 'https://manila-wine.com/carbon-sleeve-bugatti-eb01-luminous-2017-champagne',
        presentationType: 'carbon-sleeve-luminous',
        isLuminous: true,
        available: true
      },
      {
        format: 'Handcrafted 750ml',
        volume: '750ml',
        sku: 'Product16924',
        magentoProductId: 16924,
        productName: 'Champagne Carbon x Bugatti EB01 Vintage 2002 – Handcrafted Carbon Fibre Bottle 750ml',
        costPhp: 29500,
        pricePhp: 36875,
        stock: 4,
        link: 'https://manila-wine.com/carbon-hand-made-bugatti-eb01-2002-champagne',
        presentationType: 'handcrafted-carbon',
        isLuminous: false,
        available: true
      }
    ]
  },

  // 4. Bugatti EB.02 Blanc de Blancs Vintage 2006 (Product16918)
  {
    id: 'carbon-eb02-chiron-300-vintage-2006',
    slug: 'chiron-300-vintage-2006',
    title: 'Champagne Carbon × Bugatti EB.02 Vintage 2006',
    subtitle: 'Chiron Super Sport 300+ Homage Edition',
    category: 'bugatti',
    vintage: '2006 Vintage',
    tagline: 'Paying tribute to the Chiron Super Sport 300+ breaking the historic 300mph barrier.',
    overview: 'Commemorating Bugatti’s world-record run past 300 mph (490.48 km/h), the EB.02 is a 100% Grand Cru Chardonnay from the celebrated 2006 vintage. Encased in visible black and orange-trimmed genuine carbon fiber echoing the Chiron 300+, it delivers explosive energy, roasted brioche, and pristine Côte des Blancs minerality.',
    specifications: {
      vintage: '2006',
      grapeVarieties: '100% Chardonnay — Blanc de Blancs',
      classification: 'Grand Cru Terroirs',
      aging: '13 years on lees in Champillon cellars',
      dosage: '7 g/L — Brut',
      alcohol: '12.5% vol',
      cellarMasterNote: 'Precision engineering translated into fine wine: speed, focus, and peerless aging capability.'
    },
    tastingNotes: {
      eye: 'Intense golden reflection with shimmering green hints and a vigorous, fine effervescence.',
      nose: 'White flowers, yellow peach, acacia honey, candied bergamot, and roasted almond flakes.',
      palate: 'Direct, focused and crystalline on entry, unfolding into richness, toasted sourdough, and a saline, linear finish.',
      pairings: 'Lobster thermidor, roasted turbot with beurre blanc, or aged Comté (24 months).',
      scoreAwards: '94 Points — Andreas Larsson'
    },
    images: [
      '/images/bottles/chiron-300-vintage-2006-1.png',
      '/images/bottles/chiron-300-vintage-2006-2.png',
      '/images/bottles/chiron-300-vintage-2006-3.jpg',
      '/images/bottles/chiron-300-vintage-2006-4.png',
      '/images/bottles/chiron-300-vintage-2006-5.png',
      '/images/bottles/chiron-300-vintage-2006-6.png',
      '/images/bottles/chiron-300-vintage-2006-7.png'
    ],
    variants: [
      {
        format: 'Handcrafted 750ml',
        volume: '750ml',
        sku: 'Product16918',
        magentoProductId: 16918,
        productName: 'Champagne Carbon x Bugatti EB02 Vintage 2006 – Handcrafted Carbon Fibre Bottle 750ml',
        costPhp: 29500,
        pricePhp: 36875,
        stock: 1,
        link: 'https://manila-wine.com/carbon-hand-made-bugatti-eb02-2006-champagne',
        presentationType: 'handcrafted-carbon',
        isLuminous: false,
        available: true
      }
    ]
  },

  // 5. Bugatti EB.03 Bolide Blanc de Blancs Vintage 2017 (Product16919)
  {
    id: 'carbon-bolide-vintage-2017',
    slug: 'bolide-vintage-2017',
    title: 'Champagne Carbon × Bugatti EB.03 Bolide Vintage 2017',
    subtitle: 'L’Expression Extrême Carbon × Bugatti',
    category: 'bugatti',
    vintage: '2017 Vintage',
    tagline: 'The most radical and futuristic expression of the Carbon × Bugatti universe.',
    overview: 'BOLIDE is the most radical and futuristic expression of the CARBON × BUGATTI universe — a champagne shaped by extreme aerodynamics, pure forms, and uncompromising performance. Conceived equally as a sculptural masterpiece and an exceptional cuvée, BOLIDE embodies speed, precision, and ultra-modern elegance. Handcrafted through 37 production stages.',
    specifications: {
      vintage: '2017',
      grapeVarieties: '100% Chardonnay — Blanc de Blancs',
      classification: 'Grand Cru Terroirs',
      aging: '7 years on lees in traditional oak barrels',
      dosage: '7 g/L — Brut',
      alcohol: '12.5% vol',
      cellarMasterNote: 'Artisanal carbon-fiber bottle coated through 37 complex stages in Champillon.'
    },
    tastingNotes: {
      eye: 'Brilliant and transparent pale gold with silver reflections and extremely fine, creamy bubbles.',
      nose: 'Fresh and intense citrus notes (lemon, bergamot) opening into white spring flowers (lily of the valley, honeysuckle, magnolia) on a delicate minty foundation.',
      palate: 'Vibrant yellow citrus fruits, subtle grilled brioche notes, and aromatic herbs with an ethereal minerality and crisp, saline finish.',
      pairings: 'Scallop ceviche, red tuna sashimi, or filet of Saint-Pierre with citrus glaze.',
      scoreAwards: '91 Points — Andreas Larsson (Best Sommelier of the World)'
    },
    images: [
      '/images/bottles/bolide-vintage-2017-1.png',
      '/images/bottles/bolide-vintage-2017-2.png',
      '/images/bottles/bolide-vintage-2017-3.jpg',
      '/images/bottles/bolide-vintage-2017-4.png',
      '/images/bottles/bolide-vintage-2017-5.png',
      '/images/bottles/bolide-vintage-2017-6.png',
      '/images/bottles/bolide-vintage-2017-7.png'
    ],
    variants: [
      {
        format: 'Handcrafted 750ml',
        volume: '750ml',
        sku: 'Product16919',
        magentoProductId: 16919,
        productName: 'Champagne Carbon x Bugatti EB03 Blanc de Blancs Vintage 2017 – Handcrafted Carbon Fibre Bottle 750ml',
        costPhp: 30000,
        pricePhp: 37500,
        stock: 1,
        link: 'https://manila-wine.com/carbon-hand-made-bugatti-eb03-blanc-de-blancs-2017-champagne',
        presentationType: 'handcrafted-carbon',
        isLuminous: false,
        available: true
      }
    ]
  },

  // 6. Carbon Gold Blanc de Blancs Vintage 2015 (Product16923)
  {
    id: 'carbon-gold-vintage-2015',
    slug: 'gold-vintage-2015',
    title: 'Champagne Carbon Gold Vintage 2015',
    subtitle: 'Blanc de Blancs Millésime Luminous',
    category: 'limited',
    vintage: '2015 Vintage',
    tagline: '100% Grand Cru Chardonnay from the heralded 2015 harvest in an illuminated golden sleeve.',
    overview: 'A dazzling millésime Blanc de Blancs crafted exclusively from premier chalk slopes during the warm, opulent 2015 harvest. Dressed in Carbon’s signature gold-woven luminous sleeve featuring an integrated touch-activated lighting system. When illuminated, the bottle produces an unforgettable visual spectacle for VIP gatherings and collector celebrations.',
    specifications: {
      vintage: '2015',
      grapeVarieties: '100% Chardonnay — Blanc de Blancs',
      classification: 'Grand Cru Terroirs',
      aging: '8 years on lees in Champillon cellars',
      dosage: '6 g/L — Extra Brut',
      alcohol: '12.5% vol',
      cellarMasterNote: 'Touch-activated illuminated bottle sleeve with glowing gold carbon weave.'
    },
    tastingNotes: {
      eye: 'Deep radiant yellow gold with sparkling golden reflects and delicate, persistent bubble trains.',
      nose: 'White flowers, candied lemon, ripe pineapple, vanilla bean, hazelnut, and pastry brioche.',
      palate: 'Opulent and concentrated on entry with chalky tension, yellow stone fruits, Meyer lemon curd, and a vibrant mineral vibration.',
      pairings: 'Butter-poached Maine lobster, king crab legs, pan-seared sweetbreads, or aged hard cheeses.',
      scoreAwards: '93 Points — International Wine Challenge'
    },
    images: [
      '/images/bottles/blanc-de-blancs-grand-cru-2019-1.png',
      '/images/bottles/blanc-de-blancs-grand-cru-2019-2.png',
      '/images/bottles/blanc-de-blancs-grand-cru-2019-3.png',
      '/images/bottles/blanc-de-blancs-grand-cru-2019-4.png',
      '/images/bottles/blanc-de-blancs-grand-cru-2019-5.png',
      '/images/bottles/blanc-de-blancs-grand-cru-2019-6.png',
      '/images/bottles/blanc-de-blancs-grand-cru-2019-7.png'
    ],
    variants: [
      {
        format: 'Luminous Sleeve 750ml',
        volume: '750ml',
        sku: 'Product16923',
        magentoProductId: 16923,
        productName: 'Champagne Carbon Gold Vintage 2015 Luminous – Carbon-Look Sleeve 750ml',
        costPhp: 22000,
        pricePhp: 27500,
        stock: 2,
        link: 'https://manila-wine.com/carbon-sleeve-gold-luminous-2015-champagne',
        presentationType: 'carbon-sleeve-luminous',
        isLuminous: true,
        available: true
      }
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug || p.id === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getBugattiProducts(): Product[] {
  return PRODUCTS.filter(p => p.category === 'bugatti');
}
