
import { Product, ProductVariant } from '@/types';

export interface CartAddParams {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export const MANILA_WINE_BASE_URL = 'https://manila-wine.com';

/**
 * Builds the appropriate redirect URL or target link for Manila Wine Magento 2 store.
 */
export function getCartAddTargetUrl(params: CartAddParams): string {
  const { product, variant, quantity } = params;
  
  // 1. If explicit product ID is configured on Magento
  if (variant.magentoProductId) {
    return `${MANILA_WINE_BASE_URL}/checkout/cart/add/product/${variant.magentoProductId}/?qty=${quantity}`;
  }

  // 2. If direct URL key is specified on Manila Wine
  if (variant.urlKey) {
    return `${MANILA_WINE_BASE_URL}/${variant.urlKey}.html?qty=${quantity}`;
  }

  // 3. If SKU is provided: direct search / product target on Manila Wine
  if (variant.sku) {
    return `${MANILA_WINE_BASE_URL}/catalogsearch/result/?q=${encodeURIComponent(variant.sku)}`;
  }

  // 4. Default fallback: search by product title & volume
  return `${MANILA_WINE_BASE_URL}/catalogsearch/result/?q=${encodeURIComponent(product.title + ' ' + variant.format)}`;
}

/**
 * Client-side handler to trigger the add-to-cart in a new tab.
 */
export function handleAddToCart(params: CartAddParams) {
  const targetUrl = getCartAddTargetUrl(params);
  if (typeof window !== 'undefined') {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }
}
