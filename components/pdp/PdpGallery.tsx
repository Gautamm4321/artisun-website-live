'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';

/**
 * PdpGallery — the product-shot viewer shared by the Origin and Aura heroes.
 *
 * Mobile behaviour:
 *  • the left/right chevrons are gone — the image is swiped instead;
 *  • swiping wraps in BOTH directions without end, so there is no dead edge:
 *    swiping left past the last shot lands on the first, swiping right past
 *    the first lands on the last;
 *  • the small previews sit directly BELOW the main image instead of
 *    floating on top of it, so nothing covers the product. Because they are a
 *    real block in the flow, the badges, title and copy underneath shift down
 *    on their own — no manual offsets needed.
 *
 * Desktop: previously had the previews overlaid top-left on the image with
 * chevrons for navigation. Previews now use the SAME below-the-image strip
 * as mobile — only the overlay position changed. Chevrons are untouched.
 */
export default function PdpGallery({
  images,
  alt,
  frameClassName = 'aspect-square',
}: {
  images: string[];
  alt: string;
  /** Aspect/height classes for the main frame — the two PDPs differ slightly. */
  frameClassName?: string;
}) {
  const count = images.length;
  const [index, setIndex] = useState(0);
  // +1 = the new shot enters from the right, -1 = from the left.
  const [dir, setDir] = useState(1);

  // Modular arithmetic is what makes the loop endless — there is no clamp, so
  // the index simply wraps past either end.
  const go = useCallback(
    (step: number) => {
      setDir(step);
      setIndex((prev) => (prev + step + count) % count);
    },
    [count]
  );

  const jumpTo = useCallback(
    (i: number) => {
      setDir(i > index ? 1 : -1);
      setIndex(i);
    },
    [index]
  );

  /* ── Swipe ─────────────────────────────────────────────────────────────
     Tracked manually rather than with a scroll-snap strip: a snap strip
     cannot wrap endlessly without cloning slides, and cloned slides fight
     the panel's own horizontal scroll track. A threshold on the horizontal
     delta, plus a check that the gesture is more sideways than vertical,
     keeps this from stealing the page's vertical scroll. ── */
  const touch = useRef({ x: 0, y: 0, active: false });

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    touch.current = { x: t.clientX, y: t.clientY, active: true };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touch.current.active) return;
    const t = e.touches[0];
    if (!t) return;
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    // A clearly horizontal drag belongs to the gallery — stop it reaching the
    // panel scroller so the section does not scroll while you flick through.
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      e.stopPropagation();
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current.active) return;
    touch.current.active = false;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx < 0 ? 1 : -1);
  };

  const activeImg = images[index];

  return (
    <div className="flex flex-col w-full min-h-0">
      {/* ── Main shot ── */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        // pan-y lets the browser keep vertical scrolling while we take the
        // horizontal axis for the swipe.
        style={{ touchAction: 'pan-y' }}
        className={`relative w-full ${frameClassName} rounded-xl lg:rounded-2xl overflow-hidden bg-white/[0.03] shadow-2xl select-none`}
      >
        <Image
          key={activeImg + index}
          src={asset(activeImg)}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 90vw, 50vw"
          priority
          draggable={false}
          className={`object-cover object-center ${dir > 0 ? 'pdp-slide-r' : 'pdp-slide-l'}`}
        />

        {/* Desktop-only chevrons — untouched. */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="pointer-events-auto hidden lg:grid absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full place-items-center bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-all duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={() => go(1)}
          aria-label="Next image"
          className="pointer-events-auto hidden lg:grid absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full place-items-center bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 transition-all duration-300"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ── Previews: directly under the shot, on every breakpoint now.
          Was `lg:hidden` (mobile-only) with a separate overlaid desktop
          version above — that overlay is gone, and this single strip is
          shared so desktop looks identical to mobile. Sized a touch larger
          from `lg:` up since desktop has more room. ── */}
      <div className="pdp-thumbs mt-2.5 flex gap-2 overflow-x-auto pb-0.5">
        {images.map((src, i) => (
          <button
            key={`th-${src}-${i}`}
            onClick={() => jumpTo(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === index}
            className={`pointer-events-auto relative h-[46px] w-[46px] lg:h-[52px] lg:w-[52px] shrink-0 overflow-hidden rounded-md border transition-all duration-300 ${
              i === index
                ? 'opacity-100 border-white/75'
                : 'opacity-50 border-white/20 hover:opacity-80'
            }`}
          >
            <Image src={asset(src)} alt="" fill sizes="52px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}