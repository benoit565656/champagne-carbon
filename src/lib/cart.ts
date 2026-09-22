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

  const { variant, quantity = 1 } = params;
  const productId = variant.magentoProductId || parseInt(variant.sku.replace(/\D/g, ''), 10);

  if (!productId && variant.link) {
    window.open(variant.link, '_blank', 'noopener,noreferrer');
    return;
  }

  try {
    const actionUrl = getCartAddActionUrl(variant);

    // Create a dynamic form to perform a standard POST navigation into Manila Wine's cart
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = actionUrl;
    form.target = '_blank';
    form.style.display = 'none';

    // Product ID
    const inputProd = document.createElement('input');
    inputProd.type = 'hidden';
    inputProd.name = 'product';
    inputProd.value = String(productId);
    form.appendChild(inputProd);

    // Quantity
    const inputQty = document.createElement('input');
    inputQty.type = 'hidden';
    inputQty.name = 'qty';
    inputQty.value = String(quantity);
    form.appendChild(inputQty);

    // Return URL parameter
    const inputUenc = document.createElement('input');
    inputUenc.type = 'hidden';
    inputUenc.name = 'uenc';
    inputUenc.value = CART_RETURN_UENC;
    form.appendChild(inputUenc);

    document.body.appendChild(form);
    form.submit();

    // Clean up
    setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);
  } catch (err) {
    console.error('Error adding to cart, opening direct link:', err);
    if (variant.link) {
      window.open(variant.link, '_blank', 'noopener,noreferrer');
    }
  }
}

/**
 * Opens direct product page on Manila Wine.
 */
export function handleViewOnManilaWine(variant: ProductVariant) {
  if (typeof window !== 'undefined' && variant.link) {
    window.open(variant.link, '_blank', 'noopener,noreferrer');
  }
}
