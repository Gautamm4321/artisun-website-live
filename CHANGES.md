# Tracking, SEO and hero update

## Hardcoded tracking (every page, in `<head>`)
All IDs live in `lib/tracking-config.ts`. No environment variables needed.
- Google Tag Manager `GTM-WLV28NVT` (head snippet + body noscript)
- GA4 `G-KSTNGS71YM` via gtag.js
- Meta Pixel `4677288139224528` (base code + noscript); domain verification meta kept
- Microsoft Clarity `ym8jowz45n`

## Events
- Origin/Aura page load: GA4 `view_item` + Meta `ViewContent`, numeric variant ID, real price (1499 / 1799)
- Add to cart (after Shopify confirms): GA4 `add_to_cart` + Meta `AddToCart`, numeric variant ID
- Checkout click: GA4 `begin_checkout` only. Meta InitiateCheckout / Purchase are NOT fired from the site
- Meta `PageView` on client-side route changes
- Duplicate Meta events removed (each event fires once)

## Shopify analytics (browse abandonment)
`components/analytics/RouteAnalytics.tsx` (`@shopify/hydrogen-react`): cookies on artisunskin.com,
PAGE_VIEW on every route, PRODUCT_VIEW on /origin and /aura, sent to checkout.artisunskin.com.

## Consent
Cookie banner and Consent Mode "denied" default removed.

## SEO
- Product JSON-LD prices fixed (Origin 1499, Aura 1799; were 1299)
- Homepage og:image (`public/og-home.jpg`, 1200x630) + Twitter card
- Product pages: `<meta property="og:type" content="product">` + product:price tags
- Origin ingredients: one `<h3>` per ingredient (mobile/tablet copies use `<p>` with identical classes)
- Blog H1 reads "Artifacts by Artisun: The Sun Care Journal" (added words are screen-reader only)
- Meaningful alt text on product, texture and lifestyle images
- Intrinsic width/height on 21 images (less layout shift, rendered size unchanged)

## Hero
Mobile hero (below `lg`) is now `public/hero-mobile.webp` (1080x1920, 34 KB). Desktop hero unchanged.
