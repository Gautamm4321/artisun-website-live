'use client';

/**
 * RouteAnalytics — runs once in the root layout. Handles everything that has
 * to happen on client-side route changes, which the <head> snippets can't see
 * because Next.js navigates without a full page load:
 *
 *  1. Meta Pixel PageView on every route change after the first
 *     (the first one is sent by the base pixel snippet in <head>).
 *  2. Shopify analytics (browse abandonment):
 *     - sets the _shopify_y / _shopify_s cookies on artisunskin.com
 *     - PAGE_VIEW on every route
 *     - PRODUCT_VIEW on /origin and /aura
 *
 * GA4 page views on route change are handled by GA4 Enhanced Measurement
 * ("Page changes based on browser history events", on by default), so nothing
 * is sent manually here — that would double count.
 *
 * Renders nothing.
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  AnalyticsEventName,
  AnalyticsPageType,
  getClientBrowserParameters,
  sendShopifyAnalytics,
  useShopifyCookies,
} from '@shopify/hydrogen-react';
import { PRODUCTS, SHOPIFY_ANALYTICS, type TrackedProduct } from '@/lib/tracking-config';

function productForPath(pathname: string): TrackedProduct | undefined {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/origin') return PRODUCTS.origin;
  if (clean === '/aura') return PRODUCTS.aura;
  return undefined;
}

function sendShopifyEvents(pathname: string) {
  const product = productForPath(pathname);

  const base = {
    ...getClientBrowserParameters(),
    hasUserConsent: true,
    shopifySalesChannel: SHOPIFY_ANALYTICS.salesChannel,
    shopId: SHOPIFY_ANALYTICS.shopId,
    storefrontId: SHOPIFY_ANALYTICS.storefrontId,
    currency: SHOPIFY_ANALYTICS.currency,
    acceptedLanguage: SHOPIFY_ANALYTICS.acceptedLanguage,
  };

  const productPayload = product
    ? {
        pageType: AnalyticsPageType.product,
        resourceId: product.productGid,
        totalValue: product.price,
        products: [
          {
            productGid: product.productGid,
            variantGid: product.variantGid,
            name: product.name,
            variantName: product.variantName,
            brand: 'Artisun',
            category: 'Sunscreen',
            price: String(product.price),
            quantity: 1,
          },
        ],
      }
    : {};

  const payload = { ...base, ...productPayload };

  sendShopifyAnalytics(
    { eventName: AnalyticsEventName.PAGE_VIEW, payload },
    SHOPIFY_ANALYTICS.shopDomain,
  ).catch(() => {});

  if (product) {
    sendShopifyAnalytics(
      { eventName: AnalyticsEventName.PRODUCT_VIEW, payload },
      SHOPIFY_ANALYTICS.shopDomain,
    ).catch(() => {});
  }
}

export default function RouteAnalytics() {
  const pathname = usePathname() || '/';
  const isFirstRoute = useRef(true);

  const shopifyCookiesReady = useShopifyCookies({
    hasUserConsent: true,
    domain: SHOPIFY_ANALYTICS.cookieDomain,
  });

  // Meta Pixel: PageView on client-side navigations only.
  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    if (typeof window.fbq === 'function') window.fbq('track', 'PageView');
  }, [pathname]);

  // Shopify: wait for cookies, then send on every route. The short delay lets
  // Next.js update document.title before it is read for the payload.
  useEffect(() => {
    if (!shopifyCookiesReady) return;
    const t = window.setTimeout(() => {
      try {
        sendShopifyEvents(pathname);
      } catch {
        /* analytics must never break the page */
      }
    }, 50);
    return () => window.clearTimeout(t);
  }, [pathname, shopifyCookiesReady]);

  return null;
}
