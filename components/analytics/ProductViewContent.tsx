import type { TrackedProduct } from '@/lib/tracking-config';

/**
 * Meta ViewContent, fired from the server-rendered HTML of a product page.
 *
 * This inline script runs while the HTML is parsed, right after the base pixel
 * in <head> (which defines fbq and sends PageView), so ViewContent no longer
 * waits for React to load.
 *
 * It sets window.__artisunInitialVC so lib/analytics.ts#trackViewItem knows
 * this page load already sent ViewContent and does not send it again. On
 * client-side navigation (e.g. Home -> Origin via a link) React does not run
 * inline scripts, so trackViewItem sends ViewContent itself. Result: exactly
 * one ViewContent per product page view, either way.
 */
export default function ProductViewContent({ product }: { product: TrackedProduct }) {
  const params = {
    content_ids: [product.variantId],
    content_type: 'product',
    content_name: product.name,
    value: product.price,
    currency: 'INR',
  };
  const js =
    `(function(){try{window.__artisunInitialVC=${JSON.stringify(product.variantId)};` +
    `if(typeof window.fbq==='function'){window.fbq('track','ViewContent',${JSON.stringify(params)});}` +
    `}catch(e){}})();`;
  return <script id={`meta-viewcontent-${product.key}`} dangerouslySetInnerHTML={{ __html: js }} />;
}
