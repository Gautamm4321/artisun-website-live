/**
 * lib/analytics.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Unified e-commerce event dispatcher for Google Analytics 4 (GA4) and Meta Pixel.
 * Fail-safe: handles adblockers and missing global objects gracefully.
 * ─────────────────────────────────────────────────────────────────────────────
 */

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
  }
}

/**
 * 1. View Item (Product Detail Page)
 */
export function trackViewItem(item: AnalyticsItem) {
  if (typeof window === 'undefined') return;

  const qty = item.quantity || 1;

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'view_item', {
      currency: 'INR',
      value: item.price * qty,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          item_category: item.category || 'Sunscreen',
          item_variant: item.variant,
          quantity: qty,
        },
      ],
    });
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: item.name,
      content_ids: [item.id],
      content_type: 'product',
      value: item.price * qty,
      currency: 'INR',
    });
  }
}

/**
 * 2. Add To Cart
 */
export function trackAddToCart(item: AnalyticsItem) {
  if (typeof window === 'undefined') return;

  const qty = item.quantity || 1;

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'add_to_cart', {
      currency: 'INR',
      value: item.price * qty,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          item_category: item.category || 'Sunscreen',
          item_variant: item.variant,
          quantity: qty,
        },
      ],
    });
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'AddToCart', {
      content_name: item.name,
      content_ids: [item.id],
      content_type: 'product',
      value: item.price * qty,
      currency: 'INR',
    });
  }
}

/**
 * 3. Begin Checkout
 */
export function trackBeginCheckout(items: AnalyticsItem[], totalValue: number) {
  if (typeof window === 'undefined') return;

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency: 'INR',
      value: totalValue,
      items: items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price,
        quantity: i.quantity || 1,
      })),
    });
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: items.map((i) => i.id),
      num_items: items.reduce((acc, curr) => acc + (curr.quantity || 1), 0),
      value: totalValue,
      currency: 'INR',
    });
  }
}

/**
 * 4. Purchase
 */
export function trackPurchase(orderId: string, items: AnalyticsItem[], totalValue: number) {
  if (typeof window === 'undefined') return;

  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: totalValue,
      currency: 'INR',
      tax: 0,
      shipping: 0,
      items: items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price,
        quantity: i.quantity || 1,
      })),
    });
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Purchase', {
      content_ids: items.map((i) => i.id),
      content_type: 'product',
      value: totalValue,
      currency: 'INR',
    });
  }
}
