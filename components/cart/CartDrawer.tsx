'use client';

import { useEffect } from 'react';
import { useCart } from './CartProvider';
import { formatPrice, firstVariant } from '@/lib/shopify';

export default function CartDrawer() {
  const { cart, open, setOpen, setQty, remove, checkout, busy, error, configured, products, add } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  const lines = cart?.lines.nodes ?? [];

  // Cross-sell Detection: Check products currently in bag
  const hasOrigin = lines.some((l) =>
    l.merchandise.product.title.toLowerCase().includes('origin')
  );
  const hasAura = lines.some((l) =>
    l.merchandise.product.title.toLowerCase().includes('aura')
  );

  const crossSellTarget: 'origin' | 'aura' | null =
    hasOrigin && !hasAura ? 'aura' : hasAura && !hasOrigin ? 'origin' : null;
  const crossSellProduct = crossSellTarget ? products[crossSellTarget] : null;
  const crossSellVariant = firstVariant(crossSellProduct);
  const showCrossSell = Boolean(lines.length > 0 && crossSellProduct && crossSellVariant);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[130] bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        data-lenis-prevent="true"
        role="dialog"
        aria-label="Cart"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[140] flex h-[100dvh] w-full max-w-[420px] flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, #5A190D 0%, #3A0F07 55%, #1F0704 100%)',
          color: 'var(--brand-cream, #f5f0eb)',
        }}
      >
        <header className="flex items-center justify-between border-b border-white/12 px-5 py-4 shrink-0">
          <h2 className="font-editorial text-[22px] tracking-tight">
            Your bag{cart?.totalQuantity ? ` (${cart.totalQuantity})` : ''}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 flex flex-col justify-between [scrollbar-width:none]">
          <div>
            {!configured && (
              <p className="mt-5 rounded border border-[#edc6a2]/40 bg-black/25 px-3 py-3 font-suisse text-[13px] leading-relaxed">
                Shopify isn&rsquo;t connected yet. Add <code>NEXT_PUBLIC_SHOPIFY_DOMAIN</code> and{' '}
                <code>NEXT_PUBLIC_SHOPIFY_PUBLIC_TOKEN</code> to <code>.env.local</code>, then restart
                the dev server.
              </p>
            )}

            {error && (
              <p className="mt-5 rounded border border-[#edc6a2]/40 bg-black/25 px-3 py-2 font-suisse text-[13px]">
                {error}
              </p>
            )}

            {configured && lines.length === 0 && !error && (
              <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <p className="font-suisse text-[15px] text-white/60">Your bag is empty.</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-none border border-white/30 px-6 py-2.5 font-suisse text-[13px] uppercase tracking-wider transition-colors hover:bg-white/10"
                >
                  Keep looking
                </button>
              </div>
            )}

            {/* 1. Products in Bag (Always at Top) */}
            {lines.length > 0 && (
              <ul className="divide-y divide-white/10">
                {lines.map((l) => (
                  <li key={l.id} className="flex gap-4 py-4">
                    {l.merchandise.image && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={l.merchandise.image.url}
                        alt={l.merchandise.image.altText ?? ''}
                        className="h-20 w-20 rounded-[10px] object-cover ring-1 ring-white/20"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-editorial text-[16px] leading-snug">
                        {l.merchandise.product.title}
                      </p>

                      <p className="mt-0.5 font-suisse text-[11.5px] italic text-[#E8DAC7]/75">
                        {l.merchandise.product.title.toLowerCase().includes('origin')
                          ? 'Deep hydration · Pollution defence'
                          : l.merchandise.product.title.toLowerCase().includes('aura')
                          ? 'Climate defence · Barrier repairing'
                          : l.merchandise.title !== 'Default Title'
                          ? l.merchandise.title
                          : ''}
                      </p>

                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="flex items-center border border-white/25">
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => setQty(l.id, Math.max(0, l.quantity - 1))}
                            aria-label="Decrease quantity"
                            className="px-2.5 py-1 disabled:opacity-40"
                          >
                            &minus;
                          </button>
                          <span className="min-w-6 text-center font-suisse text-[13px]">
                            {l.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => setQty(l.id, l.quantity + 1)}
                            aria-label="Increase quantity"
                            className="px-2.5 py-1 disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => remove(l.id)}
                          className="font-suisse text-[12px] text-white/50 underline underline-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="font-suisse text-[14px] shrink-0">{formatPrice(l.cost.totalAmount)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Middle & Bottom Sections when Cart has items */}
          {lines.length > 0 && (
            <div className="flex flex-col justify-end w-full">
              {/* 4 Trust Badges: In center when 1 item; down at bottom when both added */}
              <div className={`${showCrossSell ? 'py-6 my-auto' : 'pt-8 pb-4'} border-t border-white/10`}>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {/* 1. No Artificial Dyes */}
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-1.5 shadow-inner">
                      <svg className="w-5 h-5 text-[#E8DAC7]/85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                    </div>
                    <span className="font-suisse text-[9px] text-white/80 leading-tight">
                      No Artificial<br />Dyes
                    </span>
                  </div>

                  {/* 2. Alcohol Free */}
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-1.5 shadow-inner">
                      <svg className="w-5 h-5 text-[#E8DAC7]/85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 2v7.31L4 19a2 2 0 0 0 1.66 3h12.68A2 2 0 0 0 20 19l-6-9.69V2" />
                        <line x1="8.5" y1="2" x2="15.5" y2="2" />
                        <line x1="3" y1="3" x2="21" y2="21" />
                      </svg>
                    </div>
                    <span className="font-suisse text-[9px] text-white/80 leading-tight">
                      Alcohol<br />Free
                    </span>
                  </div>

                  {/* 3. 100% Vegan */}
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-1.5 shadow-inner">
                      <svg className="w-5 h-5 text-[#E8DAC7]/85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                      </svg>
                    </div>
                    <span className="font-suisse text-[9px] text-white/80 leading-tight">
                      100%<br />Vegan
                    </span>
                  </div>

                  {/* 4. Cruelty Free */}
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-1.5 shadow-inner">
                      <svg className="w-5 h-5 text-[#E8DAC7]/85" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 21a6 6 0 0 0 6-6c0-2-2-4-2-4s.5-3-1-5c-2 0-3 2-3 2s-1-2-3-2c-1.5 2-1 5-1 5s-2 2-2 4a6 6 0 0 0 6 6z" />
                      </svg>
                    </div>
                    <span className="font-suisse text-[9px] text-white/80 leading-tight">
                      Cruelty<br />Free
                    </span>
                  </div>
                </div>
              </div>

              {/* Cross-Sell Box: Anchored just above Free Shipping */}
              {showCrossSell && crossSellProduct && crossSellVariant && (
                <div className="mb-4 rounded-2xl bg-white/[0.07] border border-white/15 p-3.5 backdrop-blur-md">
                  <div className="text-[10.5px] font-suisse uppercase tracking-[0.16em] text-[#E8DAC7]/70 font-semibold mb-2.5">
                    Add one more thing to your skin
                  </div>
                  <div className="flex items-center gap-3">
                    {crossSellProduct.featuredImage && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={crossSellProduct.featuredImage.url}
                        alt={crossSellProduct.title}
                        className="h-14 w-14 rounded-xl object-cover ring-1 ring-white/15 shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-editorial text-[15px] text-white leading-tight truncate">
                        {crossSellProduct.title}
                      </p>
                      <p className="font-suisse text-[11px] italic text-[#E8DAC7]/70 truncate mt-0.5">
                        {crossSellTarget === 'origin'
                          ? 'Deep hydration · Pollution defence'
                          : 'Climate defence · Barrier repairing'}
                      </p>
                      <p className="font-suisse text-[12.5px] font-medium text-white/90 mt-1">
                        {formatPrice(crossSellVariant.price)}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={busy || !crossSellVariant.availableForSale}
                      onClick={() => add(crossSellVariant.id, 1)}
                      className="px-4 py-2 bg-[#E8DAC7] hover:bg-white text-[#242623] font-suisse text-[11px] font-semibold uppercase tracking-wider rounded-md transition-all shrink-0 active:scale-95 disabled:opacity-50"
                    >
                      {busy ? '…' : 'Add'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer (Free Shipping + Subtotal + Checkout) */}
        {lines.length > 0 && cart && (
          <footer className="border-t border-white/12 px-5 py-4 bg-black/20 shrink-0">
            {/* Free Shipping Mention */}
            <div className="mb-3 flex items-center justify-center gap-2 rounded-lg bg-white/10 py-1.5 px-3 text-[11px] font-suisse tracking-[0.14em] uppercase text-[#E8DAC7]">
              <span>✓</span> Free shipping on all orders
            </div>

            <div className="mb-2 flex justify-between font-suisse text-[14px]">
              <span className="text-white/65">Subtotal</span>
              <span>{formatPrice(cart.cost.subtotalAmount)}</span>
            </div>
            <p className="mb-3 font-suisse text-[11px] text-white/45">
              Taxes calculated at checkout.
            </p>
            <button
              type="button"
              onClick={checkout}
              disabled={busy}
              style={{ backgroundColor: '#edc6a2', color: '#3A0D08' }}
              className="w-full py-3.5 font-suisse text-[13px] font-medium uppercase tracking-wider transition-colors hover:bg-white disabled:opacity-50"
            >
              {busy ? 'Updating…' : 'Checkout'}
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}