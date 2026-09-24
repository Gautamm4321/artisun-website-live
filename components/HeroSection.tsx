'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { asset } from '@/lib/asset';

export default function HeroSection({ ready = false }: { ready?: boolean }) {
  const mobileImgRef = useRef<HTMLImageElement>(null);

  /* Mobile/tablet entrance: once the loader finishes, the product shot settles
     from a slight zoom while fading up. Runs on the <img>; the scroll parallax
     runs on its wrapper, so the two transforms never fight. Desktop untouched. */
  useEffect(() => {
    const img = mobileImgRef.current;
    if (!img || window.innerWidth >= 1024) return;
    if (!ready) {
      gsap.set(img, { scale: 1.1, opacity: 0 });
      return;
    }
    gsap.to(img, { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out', clearProps: 'transform' });
  }, [ready]);

  return (
    <section
      className="relative w-full h-[100svh] overflow-hidden z-[1] flex items-end justify-center"
      style={{ background: 'var(--bg-eclipse)' }}
    >
      {/* Subtle centre glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)',
        }}
      />

      {/* 1. MOBILE HERO (below lg): full-bleed portrait product shot */}
      <div className="hero-parallax lg:hidden absolute inset-0 z-[2] pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={mobileImgRef}
          src={asset('/hero-mobile.webp')}
          alt="Artisun Aura pearl sunscreen SPF 40 PA++++ on a marble plinth"
          width={1080}
          height={1920}
          // @ts-ignore
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="hero-mobile absolute inset-0 w-full h-full object-cover object-center select-none"
          draggable={false}
        />
      </div>

      {/* 2. DESKTOP MODEL CUTOUT (lg and above: Landscape split-eye image) */}
      <div className="hidden lg:flex absolute inset-x-0 bottom-0 z-[2] justify-center pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset('/Adjusting_head_direction_to_right_202608281524.webp')} width={1800} height={1005}
          alt="Artisun Climate-Smart Sunscreen for Indian Cities"
          // @ts-ignore
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="hero-model-desktop w-auto max-w-none object-contain object-bottom select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
          draggable={false}
        />
      </div>

      {/* Warm floor dissolve gradient (Mobile only) */}
      <div
        className="lg:hidden absolute inset-x-0 bottom-0 h-[22%] z-[3] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(70,9,5,0.85) 0%, rgba(120,25,12,0.25) 55%, rgba(120,25,12,0) 100%)',
        }}
      />

      <style jsx>{`
        /* Mobile/tablet parallax: as the page scrolls up and the wordmark docks
           into the header, the product shot drifts up at ~half speed and eases
           in slightly, instead of leaving with the page 1:1. Driven by a CSS
           scroll timeline on the compositor (same technique as the wordmark,
           so both stay in lock-step). Browsers without scroll timelines simply
           scroll the image normally. */
        @supports (animation-timeline: scroll()) {
          @media (max-width: 1023px) {
            .hero-parallax {
              animation: heroParallax linear both;
              animation-timeline: scroll(root block);
              animation-range: 0px 100svh;
              will-change: transform;
            }
          }
        }
        @keyframes heroParallax {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(0, 45svh, 0) scale(1.06);
          }
        }

        /* Desktop split-eye alignment */
        .hero-model-desktop {
          height: 94vh;
          transform: translateX(1.2%);
        }

      `}</style>
    </section>
  );
}