
export type PresentationType = 'handcrafted-carbon' | 'carbon-sleeve-luminous';

export interface ProductVariant {
  format: string; // e.g. "Bottle 75 cl", "Magnum 1.5 L"
  volume: string; // e.g. "750ml", "1.5L"
  sku: string;    // Manila Wine SKU e.g. "Product16903"
  magentoProductId?: number; // e.g. 16903
  productName: string;
  costPhp: number;
  pricePhp: number;
  stock: number;
  link: string;
  presentationType: PresentationType;
  isLuminous: boolean;
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
