export interface ProductVariant {
  format: string; // e.g. "Bottle 75 cl", "Magnum 1.5 L", "Jeroboam 3 L"
  volume: string; // e.g. "750ml", "1500ml", "3000ml"
  sku: string;    // Manila Wine Magento Simple Product SKU
  magentoProductId?: number;
  urlKey?: string;
  pricePhp?: number;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'cuvee' | 'bugatti' | 'limited';
  vintage: string;
  tagline: string;
  overview: string;
  specifications: {
    vintage: string;
    grapeVarieties: string;
    classification: string;
    aging: string;
    dosage: string;
    alcohol: string;
    cellarMasterNote: string;
  };
  tastingNotes: {
    eye: string;
    nose: string;
    palate: string;
    pairings: string;
    scoreAwards?: string;
  };
  images: string[];
  variants: ProductVariant[];
}

export const PRODUCTS: Product[] = [
  {
    "id": "carbon-bolide-vintage-2017",
    "slug": "bolide-vintage-2017",
    "title": "Carbon Bolide Vintage 2017",
    "subtitle": "L'Expression Carbon × Bugatti",
    "category": "bugatti",
    "vintage": "2017",
    "tagline": "The most radical and futuristic expression of the Carbon × Bugatti universe.",
    "overview": "BOLIDE is the most radical and futuristic expression of the CARBON × BUGATTI universe — a champagne shaped by extreme aerodynamics, pure forms, and uncompromising performance. Conceived equally as a sculptural masterpiece and an exceptional cuvée, BOLIDE embodies speed, precision, and ultra-modern elegance. A rare collector's edition created for those seeking intensity and ultimate exclusivity.",
    "specifications": {
      "vintage": "2017",
      "grapeVarieties": "100% Chardonnay — Blanc de Blancs",
      "classification": "Grand Cru",
      "aging": "7 years on lees in traditional oak barrels",
      "dosage": "7 g/L — Brut",
      "alcohol": "12.5% vol",
      "cellarMasterNote": "Artisanal carbon-fiber bottle coated through 37 complex steps."
    },
    "tastingNotes": {
      "eye": "Brilliant and transparent pale gold with silver reflections and extremely fine, creamy bubbles.",
      "nose": "Fresh and intense citrus notes (lemon, bergamot) opening into white spring flowers (lily of the valley, honeysuckle, magnolia) on a delicate minty foundation.",
      "palate": "Vibrant yellow citrus fruits, subtle grilled brioche notes, and aromatic herbs with an ethereal minerality and crisp, saline finish.",
      "pairings": "Scallop ceviche, red tuna sashimi, or filet of Saint-Pierre with citrus glaze.",
      "scoreAwards": "91 Points — Andreas Larsson (Best Sommelier of the World)"
    },
    "images": [
      "/images/bottles/bolide-vintage-2017-1.png",
      "/images/bottles/bolide-vintage-2017-2.png",
      "/images/bottles/bolide-vintage-2017-3.jpg",
      "/images/bottles/bolide-vintage-2017-4.png",
      "/images/bottles/bolide-vintage-2017-5.png",
      "/images/bottles/bolide-vintage-2017-6.png",
      "/images/bottles/bolide-vintage-2017-7.png"
    ],
    "variants": [
      {
        "format": "Bottle 75 cl",
        "volume": "750ml",
        "sku": "MW-CARB-BOLIDE-750",
        "pricePhp": 38500,
        "available": true
      },
      {
        "format": "Magnum 1.5 L",
        "volume": "1500ml",
        "sku": "MW-CARB-BOLIDE-1500",
        "pricePhp": 79500,
        "available": true
      },
      {
        "format": "Jeroboam 3 L",
        "volume": "3000ml",
        "sku": "MW-CARB-BOLIDE-3000",
        "pricePhp": 265000,
        "available": true
      }
    ]
  },
  {
    "id": "carbon-eb02-chiron-300-vintage-2006",
    "slug": "chiron-300-vintage-2006",
    "title": "Carbon ƎB.02 Chiron 300+ Vintage 2006",
    "subtitle": "Tribute to 300+ MPH Technical Mastery",
    "category": "bugatti",
    "vintage": "2006",
    "tagline": "Created in homage to technical excellence and extreme speed record-breaking performance.",
    "overview": "CHIRON SUPER SPORT 300+ embodies the most powerful and sculptural expression of the Carbon and Bugatti synergy. Celebrating Bugatti breaking the mythical 300 mph barrier, the handcrafted bottle is finished in authentic visible carbon fiber weave with orange accents matching the record-breaking hypercar.",
    "specifications": {
      "vintage": "2006",
      "grapeVarieties": "100% Blanc de Blancs Grand Cru",
      "classification": "Grand Cru",
      "aging": "Over 15 years in Carbon cellars in Champillon",
      "dosage": "Extra Brut / Brut",
      "alcohol": "12.5% vol",
      "cellarMasterNote": "Handcrafted carbon-fiber shell requiring 37 artisanal steps."
    },
    "tastingNotes": {
      "eye": "Deep burnished gold with luminous amber reflections, fine persistent effervescence.",
      "nose": "Complex aromas of toasted hazelnut, candied citrus peel, brioche, and roasted coffee bean.",
      "palate": "Rich, muscular yet exceptionally balanced with velvety texture, crystalline acidity, and a transcendent finish.",
      "pairings": "Wagyu beef carpaccio, caviar osciètre, and aged Comté cheeses.",
      "scoreAwards": "Rare Bugatti Collector Cuvée"
    },
    "images": [
      "/images/bottles/chiron-300-vintage-2006-1.png",
      "/images/bottles/chiron-300-vintage-2006-2.png",
      "/images/bottles/chiron-300-vintage-2006-3.jpg",
      "/images/bottles/chiron-300-vintage-2006-4.png",
      "/images/bottles/chiron-300-vintage-2006-5.png",
      "/images/bottles/chiron-300-vintage-2006-6.png",
      "/images/bottles/chiron-300-vintage-2006-7.png"
    ],
    "variants": [
      {
        "format": "Bottle 75 cl",
        "volume": "750ml",
        "sku": "MW-CARB-CHIRON-750",
        "pricePhp": 42000,
        "available": true
      },
      {
        "format": "Magnum 1.5 L",
        "volume": "1500ml",
        "sku": "MW-CARB-CHIRON-1500",
        "pricePhp": 89000,
        "available": true
      },
      {
        "format": "Jeroboam 3 L",
        "volume": "3000ml",
        "sku": "MW-CARB-CHIRON-3000",
        "pricePhp": 295000,
        "available": true
      }
    ]
  },
  {
    "id": "carbon-eb01-bugatti-vintage-2002",
    "slug": "eb-01-bugatti-vintage-2002",
    "title": "Carbon ƎB.01 Bugatti Heritage Vintage 2002",
    "subtitle": "110th Anniversary Commemorative Edition",
    "category": "bugatti",
    "vintage": "2002",
    "tagline": "Two brands of French excellence united in a 20-year aged vintage celebration.",
    "overview": "In 2018, the French hypercar manufacturer's 110th anniversary kick-started this exclusive partnership. For this historic celebration, Carbon created ƎB.01 Bugatti Heritage Vintage 2002. Aged twenty years in chalk cellars, it balances the youthful vivacity of Chardonnay with the rich tertiary complexity of long bottle maturation.",
    "specifications": {
      "vintage": "2002",
      "grapeVarieties": "90% Chardonnay, 10% Pinot Noir",
      "classification": "Grand Cru",
      "aging": "20 years cellar aged in oak & bottle",
      "dosage": "Brut",
      "alcohol": "12.5% vol",
      "cellarMasterNote": "Coated in Bugatti French Racing Blue carbon fiber weave."
    },
    "tastingNotes": {
      "eye": "Radiant golden straw with subtle greenish-gold highlights and microscopic ribbons of bubbles.",
      "nose": "Intensely aromatic nose of white peach, toasted almonds, acacia honey, and warm brioche.",
      "palate": "The attack in mouth is precise, ample, and balanced, showing magnificent freshness alongside developed notes of dried fruits and spice.",
      "pairings": "Pan-seared turbot, white truffles, lobster thermidor, and langoustines.",
      "scoreAwards": "93 Points — Andreas Larsson (Tasted Journal)"
    },
    "images": [
      "/images/bottles/eb-01-bugatti-vintage-2002-1.png",
      "/images/bottles/eb-01-bugatti-vintage-2002-2.jpg",
      "/images/bottles/eb-01-bugatti-vintage-2002-3.png",
      "/images/bottles/eb-01-bugatti-vintage-2002-4.png",
      "/images/bottles/eb-01-bugatti-vintage-2002-5.png",
      "/images/bottles/eb-01-bugatti-vintage-2002-6.png"
    ],
    "variants": [
      {
        "format": "Bottle 75 cl",
        "volume": "750ml",
        "sku": "MW-CARB-EB01-750",
        "pricePhp": 39500,
        "available": true
      },
      {
        "format": "Magnum 1.5 L",
        "volume": "1500ml",
        "sku": "MW-CARB-EB01-1500",
        "pricePhp": 84000,
        "available": true
      },
      {
        "format": "Jeroboam 3 L",
        "volume": "3000ml",
        "sku": "MW-CARB-EB01-3000",
        "pricePhp": 280000,
        "available": true
      }
    ]
  },
  {
    "id": "carbon-blanc-de-noirs-vintage-2009",
    "slug": "blanc-de-noirs-vintage-2009",
    "title": "Carbon Blanc de Noirs Vintage 2009",
    "subtitle": "Pure Grand Cru Pinot Noir Mastery",
    "category": "cuvee",
    "vintage": "2009",
    "tagline": "The power, depth, and vinous richness of exceptional Montagne de Reims Pinot Noir.",
    "overview": "Crafted exclusively from selected Grand Cru Pinot Noir parcel selections, Carbon Blanc de Noirs 2009 undergoes oak barrel vinification and extensive cellar aging. Sealed inside a real aerospace carbon-fiber weave bottle, light is completely blocked, preserving the champagne in perfect darkness until the moment of tasting.",
    "specifications": {
      "vintage": "2009",
      "grapeVarieties": "100% Pinot Noir",
      "classification": "Grand Cru",
      "aging": "Over 10 years cellar aged on lees",
      "dosage": "7 g/L — Brut",
      "alcohol": "12.5% vol",
      "cellarMasterNote": "Handcrafted copper-tinged carbon fiber sheath."
    },
    "tastingNotes": {
      "eye": "Warm, luminous amber-gold with an ultra-fine creamy foam crown.",
      "nose": "Rich and structured bouquet of red berries, mirabelle plum, fig, sweet vanilla spice, and toasted hazelnuts.",
      "palate": "Generous and powerful attack with deep vinous body, velvety texture, and lingering gastronomic freshness.",
      "pairings": "Bresse poultry with morels, roast duck breast, Iberico ham, and venison medallions.",
      "scoreAwards": "94 Points — Sommelier International"
    },
    "images": [
      "/images/bottles/blanc-de-noirs-vintage-2009-1.png",
      "/images/bottles/blanc-de-noirs-vintage-2009-2.png",
      "/images/bottles/blanc-de-noirs-vintage-2009-3.png",
      "/images/bottles/blanc-de-noirs-vintage-2009-4.png",
      "/images/bottles/blanc-de-noirs-vintage-2009-5.png",
      "/images/bottles/blanc-de-noirs-vintage-2009-6.png",
      "/images/bottles/blanc-de-noirs-vintage-2009-7.png"
    ],
    "variants": [
      {
        "format": "Bottle 75 cl",
        "volume": "750ml",
        "sku": "MW-CARB-BDN09-750",
        "pricePhp": 32000,
        "available": true
      },
      {
        "format": "Magnum 1.5 L",
        "volume": "1500ml",
        "sku": "MW-CARB-BDN09-1500",
        "pricePhp": 68000,
        "available": true
      },
      {
        "format": "Jeroboam 3 L",
        "volume": "3000ml",
        "sku": "MW-CARB-BDN09-3000",
        "pricePhp": 220000,
        "available": true
      }
    ]
  },
  {
    "id": "carbon-rose",
    "slug": "carbon-rose",
    "title": "Carbon Rosé",
    "subtitle": "Haute Couture Salmon Pink Cuvée",
    "category": "cuvee",
    "vintage": "NV",
    "tagline": "A bright salmon pink ensures that this champagne stands out with tangy spring freshness.",
    "overview": "The color of this Rosé CARBON is a work of haute couture. A parade of fine pearly bubbles seems to stretch to infinity. A beautiful, persistent sheath of foam resides at the top of the glass. Fresh, fruity flavors emerge on a well-balanced palate that deploys its pink charms with irresistible persistence.",
    "specifications": {
      "vintage": "Multi-Vintage",
      "grapeVarieties": "50% Chardonnay, 25% Pinot Noir, 25% Pinot Meunier",
      "classification": "Premier & Grand Cru",
      "aging": "Minimum 5 years in Carbon cellars",
      "dosage": "Brut",
      "alcohol": "12% vol",
      "cellarMasterNote": "Handcrafted metallic pink carbon fiber weave."
    },
    "tastingNotes": {
      "eye": "Bright salmon pink with shimmering coral highlights and a delicate mousse.",
      "nose": "Very aromatic, with a colorful collection of red fruits: strawberries, raspberries, and wild cherries, followed by floral notes of violet and lilac.",
      "palate": "Vibrant, silky, and tangy spring freshness. The red berry core is supported by a crystalline mineral backbone.",
      "pairings": "Salmon carpaccio, strawberry and pomegranate tart, blue lobster, or delicate sushi.",
      "scoreAwards": "90 Points — Andreas Larsson (Best Sommelier of the World)"
    },
    "images": [
      "/images/bottles/carbon-rose-1.png",
      "/images/bottles/carbon-rose-2.png",
      "/images/bottles/carbon-rose-3.png",
      "/images/bottles/carbon-rose-4.png",
      "/images/bottles/carbon-rose-5.png",
      "/images/bottles/carbon-rose-6.png",
      "/images/bottles/carbon-rose-7.png"
    ],
    "variants": [
      {
        "format": "Bottle 75 cl",
        "volume": "750ml",
        "sku": "MW-CARB-ROSE-750",
        "pricePhp": 26500,
        "available": true
      },
      {
        "format": "Magnum 1.5 L",
        "volume": "1500ml",
        "sku": "MW-CARB-ROSE-1500",
        "pricePhp": 55000,
        "available": true
      },
      {
        "format": "Jeroboam 3 L",
        "volume": "3000ml",
        "sku": "MW-CARB-ROSE-3000",
        "pricePhp": 185000,
        "available": true
      }
    ]
  },
  {
    "id": "carbon-blanc-de-blancs-grand-cru-2019",
    "slug": "blanc-de-blancs-grand-cru-2019",
    "title": "Carbon Blanc de Blancs Grand Cru Vintage 2019",
    "subtitle": "Pure Côte des Blancs Elegance",
    "category": "cuvee",
    "vintage": "2019",
    "tagline": "This Vintage Grand Cru immediately catches the eye with an ethereal suppleness.",
    "overview": "Crafted exclusively from 100% Grand Cru Chardonnay from the prestigious Côte des Blancs terroir. First, with its gorgeous, persistent crown of bubbles, like a fluffy delicate veil. The champagne deploys a palette of flavors in a strictly orchestrated game of balance and ethereal suppleness.",
    "specifications": {
      "vintage": "2019",
      "grapeVarieties": "100% Chardonnay",
      "classification": "Grand Cru",
      "aging": "6 years on lees in chalk cellars",
      "dosage": "Brut",
      "alcohol": "12.5% vol",
      "cellarMasterNote": "Handcrafted obsidian carbon fiber weave."
    },
    "tastingNotes": {
      "eye": "Light golden color heralding a radiant entrance, extremely fine and creamy bubbles.",
      "nose": "Subtle aromas of white orchard blossoms, candied citrus, fresh almond, and crushed chalk minerality.",
      "palate": "Languorously rounded, velvety and harmonious with notes of yellow fruits and nuts uplifted by a brisk, refreshing salinity.",
      "pairings": "Oysters on the half shell, caviar blinis, sea bass fillet, and scallop carpaccio.",
      "scoreAwards": "93 Points IWSC, 92 Points Decanter"
    },
    "images": [
      "/images/bottles/blanc-de-blancs-grand-cru-2019-1.png",
      "/images/bottles/blanc-de-blancs-grand-cru-2019-2.png",
      "/images/bottles/blanc-de-blancs-grand-cru-2019-3.png",
      "/images/bottles/blanc-de-blancs-grand-cru-2019-4.png",
      "/images/bottles/blanc-de-blancs-grand-cru-2019-5.png",
      "/images/bottles/blanc-de-blancs-grand-cru-2019-6.png",
      "/images/bottles/blanc-de-blancs-grand-cru-2019-7.png"
    ],
    "variants": [
      {
        "format": "Bottle 75 cl",
        "volume": "750ml",
        "sku": "MW-CARB-BDB19-750",
        "pricePhp": 29500,
        "available": true
      },
      {
        "format": "Magnum 1.5 L",
        "volume": "1500ml",
        "sku": "MW-CARB-BDB19-1500",
        "pricePhp": 62000,
        "available": true
      },
      {
        "format": "Jeroboam 3 L",
        "volume": "3000ml",
        "sku": "MW-CARB-BDB19-3000",
        "pricePhp": 198000,
        "available": true
      }
    ]
  },
  {
    "id": "carbon-brut",
    "slug": "carbon-brut",
    "title": "Carbon Brut",
    "subtitle": "The Signature Icon of the House",
    "category": "cuvee",
    "vintage": "NV",
    "tagline": "An artistic performance and atomic ballet of exceptionally refined bubbles.",
    "overview": "The quintessential signature of Champagne Carbon. A body of exceptionally refined bubbles begins its frenetic dance. A persistent, creamy foam welcomes the new arrivals to a fizzing celebration. Traditional oak barrels turned and refilled daily by a single cellar man provide the core structure, imparting depth and character rarely found in industrially-produced champagnes.",
    "specifications": {
      "vintage": "Multi-Vintage",
      "grapeVarieties": "50% Chardonnay, 25% Pinot Noir, 25% Pinot Meunier",
      "classification": "Premier & Grand Cru",
      "aging": "At least 5 years in Carbon cellars",
      "dosage": "Brut",
      "alcohol": "12% vol",
      "cellarMasterNote": "Handcrafted classic black carbon fiber weave."
    },
    "tastingNotes": {
      "eye": "Pale golden color announcing a transition to a bouquet in a timeless eulogy.",
      "nose": "Complex nose whispering of white peaches, poached pears, fresh butter, white flowers, and delicate spicy notes.",
      "palate": "The attack is superb, then becomes full-bodied, rich and generous. Notes of toasted brioche and citrus confirm its elegance.",
      "pairings": "Aperitifs of distinction, Iberian ham, mild cheeses, and roast poultry.",
      "scoreAwards": "90 Points Decanter World Wine Awards"
    },
    "images": [
      "/images/bottles/carbon-brut-1.png",
      "/images/bottles/carbon-brut-2.png",
      "/images/bottles/carbon-brut-3.png",
      "/images/bottles/carbon-brut-4.png",
      "/images/bottles/carbon-brut-5.png",
      "/images/bottles/carbon-brut-6.png",
      "/images/bottles/carbon-brut-7.png"
    ],
    "variants": [
      {
        "format": "Bottle 75 cl",
        "volume": "750ml",
        "sku": "MW-CARB-BRUT-750",
        "pricePhp": 24000,
        "available": true
      },
      {
        "format": "Magnum 1.5 L",
        "volume": "1500ml",
        "sku": "MW-CARB-BRUT-1500",
        "pricePhp": 49500,
        "available": true
      },
      {
        "format": "Jeroboam 3 L",
        "volume": "3000ml",
        "sku": "MW-CARB-BRUT-3000",
        "pricePhp": 165000,
        "available": true
      }
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getBugattiProducts(): Product[] {
  return PRODUCTS.filter(p => p.category === 'bugatti');
}

export function getCuveeProducts(): Product[] {
  return PRODUCTS.filter(p => p.category === 'cuvee');
}
