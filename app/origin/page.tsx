'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CustomCursor from '@/components/CustomCursor';
import GlobalHeader from '@/components/GlobalHeader';
import OriginHero from '@/components/origin/OriginHero';
import OriginWhy from '@/components/origin/OriginWhy';
import OriginWhere from '@/components/origin/OriginWhere';
import OriginWhatsIn from '@/components/origin/OriginWhatsIn';
import OriginProduct from '@/components/origin/OriginProduct';
import OriginQuestions from '@/components/origin/OriginQuestions';
import StickyCartBar from '@/components/origin/StickyCartBar';
import { asset } from '@/lib/asset';

const PANELS = 6;
const DESKTOP_MIN_WIDTH = 1024; // matches Tailwind `lg`

export default function OriginPage() {
  const mouseProxy = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const isDesktopRef = useRef(false);

  // cursor proxy
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseProxy.current.px = e.clientX;
      mouseProxy.current.py = e.clientY;
      mouseProxy.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseProxy.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Same reasoning as before: kill any scroll-position offset before the
    // trigger/track measures itself, on both breakpoints.
    const prevRestoration = history.scrollRestoration;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    // Lenis still drives smoothing on mobile's normal vertical scroll, not
    // just the desktop horizontal track.
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    (window as unknown as { __ARTISUN_LENIS__?: Lenis }).__ARTISUN_LENIS__ = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    gsap.set(document.documentElement, {
      '--mc-center': '100%',
      '--mc-pos-1': '20%',
      '--mc-pos-2': '50%',
      '--mc-pos-3': '110%',
      '--mc-pos-4': '200%',
      '--mc-pos-5': '250%',
      '--mc-pos-6': '300%',
    });

    const mm = gsap.matchMedia();

    // ── Desktop: unchanged pinned, scrubbed, horizontal track ──
    mm.add(`(min-width: ${DESKTOP_MIN_WIDTH}px)`, () => {
      isDesktopRef.current = true;
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;

      const getScrollAmount = () => (PANELS - 1) * window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => '+=' + getScrollAmount(),
        pin: true,
        scrub: 1,
        animation: tween,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
      stRef.current = st;

      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
      });

      // gsap.matchMedia calls this automatically when the query stops matching
      return () => {
        st.kill();
        stRef.current = null;
        gsap.set(track, { clearProps: 'transform' });
      };
    });

    // ── Mobile: plain vertical stack — no pin, no horizontal drive ──
    mm.add(`(max-width: ${DESKTOP_MIN_WIDTH - 1}px)`, () => {
      isDesktopRef.current = false;
      stRef.current = null;

      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
      });

      return () => {};
    });

    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      if ('scrollRestoration' in history) history.scrollRestoration = prevRestoration;
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __ARTISUN_LENIS__?: Lenis }).__ARTISUN_LENIS__;
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const goToPanel = (i: number) => {
    if (isDesktopRef.current) {
      const lenis = lenisRef.current;
      const st = stRef.current;
      if (!lenis || !st) return;
      const target = st.start + (i / (PANELS - 1)) * (st.end - st.start);
      lenis.scrollTo(target, { duration: 1.2 });
      return;
    }

    // Mobile: panels are in normal document flow — scroll straight to the
    // panel element instead of computing a horizontal-track offset.
    const panels = trackRef.current?.querySelectorAll<HTMLElement>('.origin-panel');
    const el = panels?.[i];
    if (!el) return;

    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.2, offset: -76 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="relative w-full min-h-[100svh] overflow-clip">
      <h1 className="sr-only">Origin — 4-in-1 Milk Sunscreen SPF 50+</h1>
      <ScrollProgressBar marker={asset('/b2.webp')} markerHeight={20} />
      <div id="global-bg" className="theme-molten-core" />

      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

      <style jsx global>{`
        html, body {
          overflow-x: hidden;
        }
      `}</style>

      {/* ── 6 EXACT ORDERED PANELS ──
          Desktop (lg+): fixed-height pinned wrapper, track slides horizontally
          — same as before.
          Mobile: wrapper/track fall back to plain block flow (flex-col, auto
          height) so the six panels stack and the page scrolls vertically. */}
      <div
        ref={wrapperRef}
        className="relative w-full lg:h-[100svh] lg:overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row lg:flex-nowrap w-full lg:h-full lg:w-[600vw] will-change-transform"
        >
          {/* 1. Home Section */}
          <OriginHero onNavigate={goToPanel} />

          {/* 2. The most boring step in your morning */}
          <OriginWhy />

          {/* 3. One sunscreen. Every Indian weather. */}
          <OriginWhere />

          {/* 4. The good vision of everything. */}
          <OriginWhatsIn />

          {/* 5. ORIGIN 4-in-1 Milk Emulsion SPF 50+ */}
          <OriginProduct />

          {/* 6. Origin questions everything answered */}
          <OriginQuestions />
        </div>
      </div>

      <StickyCartBar />
    </main>
  );
}