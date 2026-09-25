'use client';

import { useCart } from '@/components/cart/CartProvider';
import { firstVariant, formatPrice } from '@/lib/shopify';

/**
 * AddToBagButton — the single place any "Add to bag" on the site is wired.
 *
 * Every buy button used to be its own bare <button> with no handler, which
 * meant seven different places could each drift out of sync with the cart.
 * They now all render this, so the states below are guaranteed consistent
 * wherever a visitor happens to click:
 *
 *   catalogue loading  → disabled, "Loading…"
 *   Shopify not set up → disabled, "Unavailable" (rather than a button that
 *                        looks live and silently does nothing)
 *   variant sold out   → disabled, "Sold out"
 *   mid-request        → disabled, "Adding…"
 *
 * `className` is passed straight through so each placement keeps the exact
 * styling it already had — this changes behaviour, not design.
 */
export default function AddToBagButton({
  product,
  className = '',
  label = 'Add to bag',
  showPrice = false,
  quantity = 1,
}: {
  /** Which product this button buys. `duo` = the Weather Duo combo product. */
  product: 'origin' | 'aura' | 'duo';
  className?: string;
  /** Override the resting label, e.g. "Buy now". */
  label?: string;
  /** Append the live Shopify price to the label. */
  showPrice?: boolean;
  quantity?: number;
}) {
  const { add, products, loadingProducts, busy, configured } = useCart();

  const shopProduct = products[product] ?? null;
  const variant = firstVariant(shopProduct);

  const soldOut = Boolean(variant && !variant.availableForSale);
  const disabled = !configured || loadingProducts || busy || !variant || soldOut;

  const text = !configured || (!loadingProducts && !variant)
    ? 'Unavailable'
    : loadingProducts
      ? 'Loading…'
      : soldOut
        ? 'Sold out'
        : busy
          ? 'Adding…'
          : showPrice && variant
            ? `${label} — ${formatPrice(variant.price)}`
            : label;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-busy={busy}
      onClick={() => variant && add(variant.id, quantity)}
      className={`${className} disabled:opacity-55 disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  );
}
