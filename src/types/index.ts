
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

export interface UserSession {
  id: string;
  email: string;
  display_name: string;
  role: 'admin' | 'user';
}
