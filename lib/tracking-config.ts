/**
 * lib/tracking-config.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for every tracking ID and product ID used by
 * Meta Pixel, GA4 / GTM, Microsoft Clarity and Shopify analytics.
 *
 * These are hardcoded on purpose (client request) so tracking never depends on
 * a hosting environment variable being set. None of these values are secret:
 * they all end up in the public page source anyway.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const GTM_ID = 'GTM-WLV28NVT';
export const GA4_MEASUREMENT_ID = 'G-KSTNGS71YM';
export const META_PIXEL_ID = '4677288139224528';
export const CLARITY_ID = 'ym8jowz45n';

export const SHOPIFY_ANALYTICS = {
  shopId: 'gid://shopify/Shop/67157033023',
  storefrontId: '361647',
  /** Domain Shopify analytics are sent to (no protocol). */
  shopDomain: 'checkout.artisunskin.com',
  /** Cookie domain shared by the site and Shopify checkout. */
  cookieDomain: 'artisunskin.com',
  currency: 'INR' as const,
  acceptedLanguage: 'EN' as const,
  salesChannel: 'headless' as const,
};

export type TrackedProduct = {
  key: 'origin' | 'aura';
  name: string;
  /** Numeric Shopify variant ID — used as GA4 item_id and Meta content_id. */
  variantId: string;
  productGid: string;
  variantGid: string;
  /** Real selling price in INR. */
  price: number;
  variantName: string;
};

export const PRODUCTS: Record<'origin' | 'aura', TrackedProduct> = {
  origin: {
    key: 'origin',
    name: 'Origin 4-in-1 Milk Sunscreen SPF 50+ PA++++',
    variantId: '43804935520319',
    productGid: 'gid://shopify/Product/8330420944959',
    variantGid: 'gid://shopify/ProductVariant/43804935520319',
    price: 1499,
    variantName: '50 ml',
  },
  aura: {
    key: 'aura',
    name: 'Aura Pearl Sunscreen SPF 40 PA++++',
    variantId: '43804935553087',
    productGid: 'gid://shopify/Product/8330420977727',
    variantGid: 'gid://shopify/ProductVariant/43804935553087',
    price: 1799,
    variantName: '50 g',
  },
};

/** "gid://shopify/ProductVariant/123" → "123". Plain numbers pass through. */
export function numericShopifyId(id: string): string {
  const m = /(\d+)\s*$/.exec(id || '');
  return m ? m[1] : id;
}

/** Look up a known product by any form of its variant ID. */
export function productByVariant(id: string): TrackedProduct | undefined {
  const n = numericShopifyId(id);
  return Object.values(PRODUCTS).find((p) => p.variantId === n);
}
