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

    const prevRestoration = history.scrollRestoration;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const isMobile = window.innerWidth < DESKTOP_MIN_WIDTH;

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });
      lenisRef.current = lenis;
      (window as unknown as { __ARTISUN_LENIS__?: Lenis }).__ARTISUN_LENIS__ = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      raf = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

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

    // ── Desktop: pinned, scrubbed, horizontal track (unchanged) ──
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
        lenis?.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
      });

      return () => {
        st.kill();
        stRef.current = null;
        gsap.set(track, { clearProps: 'transform' });
      };
    });

    // ── Mobile: CSS scroll-snap on the wrapper div itself ──
    // The wrapper (#origin-snap-container) is made height:100svh + overflow-y:auto
    // + scroll-snap-type:y mandatory via inline CSS. This avoids the body
    // overflow-x:clip interference that breaks html-level snap.
    mm.add(`(max-width: ${DESKTOP_MIN_WIDTH - 1}px)`, () => {
      isDesktopRef.current = false;
      stRef.current = null;

      requestAnimationFrame(() => {
        // Snap back to top on load
        const wrapper = wrapperRef.current;
        if (wrapper) wrapper.scrollTop = 0;
        ScrollTrigger.refresh();
      });

      return () => {};
    });

    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      if ('scrollRestoration' in history) history.scrollRestoration = prevRestoration;
      if (raf) gsap.ticker.remove(raf);
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
        delete (window as unknown as { __ARTISUN_LENIS__?: Lenis }).__ARTISUN_LENIS__;
      }
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

    // Mobile: scroll the wrapper container (the snap container) to the panel.
    const wrapper = wrapperRef.current;
    const panels = trackRef.current?.querySelectorAll<HTMLElement>('.origin-panel');
    const el = panels?.[i];
    if (!el || !wrapper) return;
    wrapper.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
  };

  return (
    <main className="relative w-full lg:overflow-clip">
      <h1 className="sr-only">Origin — 4-in-1 Milk Sunscreen SPF 50+</h1>
      <ScrollProgressBar marker={asset('/b2.webp')} markerHeight={20} />
      <div id="global-bg" className="theme-molten-core" />

      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

      <style jsx global>{`
  /* ── Mobile snap: wrapper div as the scroll container ──
     html/body are locked; #origin-snap-container (position:fixed,
     height:100svh, overflow-y:auto) is the ONLY scroll container.
     This completely bypasses the body{overflow-x:clip} interference. */
  @media (max-width: 1023px) {
    html, body {
      overflow: hidden !important;
    }

    #origin-snap-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100svh;
      overflow-y: auto;
      overflow-x: hidden;
      scroll-snap-type: y mandatory;
      overscroll-behavior-y: contain;
      -webkit-overflow-scrolling: touch;
    }

    /* Each panel is at least one full viewport — zero gap between sections.
       height:auto lets tall content EXPAND the panel instead of being clipped.
       overflow:visible ensures nothing is hidden on small screens. */
    .origin-panel {
      height: auto !important;
      min-height: 100svh !important;
      overflow: visible !important;
      scroll-snap-align: start;
      scroll-snap-stop: always;
    }

    /* Remove inner scroll containers — content flows into the panel naturally */
    .panel-scroll {
      overflow: visible !important;
      height: auto !important;
    }
  }
`}</style>

      {/* ── 6 PANELS ──
          Desktop: fixed-height pinned wrapper, GSAP drives horizontal track.
          Mobile:  #origin-snap-container is height:100svh overflow-y:auto
                   scroll-snap-type:y mandatory — each .origin-panel snaps to
                   the top of this container one at a time. */}
      <div
        ref={wrapperRef}
        id="origin-snap-container"
        className="relative w-full lg:h-[100svh] lg:overflow-hidden lg:position-static"
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

          {/* 4. The good version of everything. */}
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