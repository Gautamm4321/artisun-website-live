/**
 * lib/analytics.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * E-commerce events for GA4 (gtag) and Meta Pixel (fbq).
 *
 * - Item / content IDs are always the NUMERIC Shopify variant ID, so they match
 *   the Meta catalogue and what Shopify checkout sends.
 * - Known products always report their real price from lib/tracking-config.
 * - Each event fires exactly once per platform (the old code fired Meta
 *   ViewContent / AddToCart twice).
 * - Meta InitiateCheckout and Purchase are deliberately NOT fired here:
 *   Shopify checkout sends both, and firing them from the site too would
 *   count every sale twice.
 *
 * Both gtag and fbq are defined by inline scripts in <head> (app/layout.tsx),
 * so they exist before any page code runs. Calls are still guarded in case an
 * ad blocker removes them.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { numericShopifyId, productByVariant, type TrackedProduct } from './tracking-config';

export type AnalyticsItem = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
  variant?: string;
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
    dataLayer?: unknown[];
  }
}

/** Normalise an item: numeric ID, and the real price for known products. */
function normalise(item: AnalyticsItem): Required<Pick<AnalyticsItem, 'id' | 'name' | 'price' | 'quantity'>> &
  AnalyticsItem {
  const known = productByVariant(item.id);
  return {
    ...item,
    id: known ? known.variantId : numericShopifyId(item.id),
    name: known ? known.name : item.name,
    price: known ? known.price : item.price,
    variant: item.variant ?? known?.variantName,
    quantity: item.quantity || 1,
  };
}

function gtagSafe(...args: any[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag(...args);
}

function fbqSafe(...args: any[]) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') window.fbq(...args);
}

/** Product page view → GA4 view_item + Meta ViewContent. */
export function trackViewItem(product: TrackedProduct) {
  if (typeof window === 'undefined') return;

  gtagSafe('event', 'view_item', {
    currency: 'INR',
    value: product.price,
    items: [
      {
        item_id: product.variantId,
        item_name: product.name,
        item_brand: 'Artisun',
        item_category: 'Sunscreen',
        item_variant: product.variantName,
        price: product.price,
        quantity: 1,
      },
    ],
  });

  fbqSafe('track', 'ViewContent', {
    content_ids: [product.variantId],
    content_type: 'product',
    content_name: product.name,
    value: product.price,
    currency: 'INR',
  });
}

/** Successful add-to-cart → GA4 add_to_cart + Meta AddToCart. */
export function trackAddToCart(raw: AnalyticsItem) {
  if (typeof window === 'undefined') return;
  const item = normalise(raw);
  const value = item.price * item.quantity;

  gtagSafe('event', 'add_to_cart', {
    currency: 'INR',
    value,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        item_brand: 'Artisun',
        item_category: item.category || 'Sunscreen',
        item_variant: item.variant,
        price: item.price,
        quantity: item.quantity,
      },
    ],
  });

  fbqSafe('track', 'AddToCart', {
    content_ids: [item.id],
    content_type: 'product',
    content_name: item.name,
    value,
    currency: 'INR',
  });
}

/**
 * Checkout button click → GA4 begin_checkout ONLY.
 * No Meta InitiateCheckout here: Shopify checkout sends it.
 */
export function trackBeginCheckout(rawItems: AnalyticsItem[], totalValue: number) {
  if (typeof window === 'undefined') return;
  const items = rawItems.map(normalise);

  gtagSafe('event', 'begin_checkout', {
    currency: 'INR',
    value: totalValue,
    items: items.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      item_brand: 'Artisun',
      price: i.price,
      quantity: i.quantity,
    })),
  });
}
