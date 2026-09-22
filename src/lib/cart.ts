import { Product, ProductVariant } from '@/types';

export interface CartAddParams {
  product: Product;
  variant: ProductVariant;
  quantity?: number;
}

export const MANILA_WINE_BASE_URL = 'https://manila-wine.com';
export const MANILA_WINE_CART_URL = 'https://manila-wine.com/checkout/cart/';

// Pre-computed base64 uenc parameter for https://manila-wine.com/checkout/cart/
const CART_RETURN_UENC = 'aHR0cHM6Ly9tYW5pbGEtd2luZS5jb20vY2hlY2tvdXQvY2FydC8,';

/**
 * Builds the direct add-to-cart form action URL for Manila Wine Magento 2 store.
 */
export function getCartAddActionUrl(variant: ProductVariant): string {
  const productId = variant.magentoProductId || parseInt(variant.sku.replace(/\D/g, ''), 10);
  if (productId) {
    return `${MANILA_WINE_BASE_URL}/checkout/cart/add/uenc/${CART_RETURN_UENC}/product/${productId}/`;
  }
  return variant.link || MANILA_WINE_CART_URL;
}

/**
 * Client-side handler to add SKU directly into Manila Wine cart in a new tab.
 * Submits an HTTP POST to Magento 2 cart controller to add the product and land on /checkout/cart/.
 */
export function handleAddToCart(params: CartAddParams) {
  if (typeof window === 'undefined') return;

  const { variant } = params;

  if (variant.link) {
    window.open(variant.link, '_blank', 'noopener,noreferrer');
    return;
  }

  window.open(MANILA_WINE_CART_URL, '_blank', 'noopener,noreferrer');
}

/**
 * Opens direct product page on Manila Wine.
 */
export function handleViewOnManilaWine(variant: ProductVariant) {
  if (typeof window !== 'undefined' && variant.link) {
    window.open(variant.link, '_blank', 'noopener,noreferrer');
  }
}
