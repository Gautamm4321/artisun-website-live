'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CustomCursor from '@/components/CustomCursor';
import GlobalHeader from '@/components/GlobalHeader';
import AuraHero from '@/components/aura/AuraHero';
import AuraDosage from '@/components/aura/AuraDosage';
import AuraTexture from '@/components/aura/AuraTexture';
import AuraWhere from '@/components/aura/AuraWhere';
import AuraWhatsIn from '@/components/aura/AuraWhatsIn';
import AuraDiff from '@/components/aura/AuraDiff';
import AuraProduct from '@/components/aura/AuraProduct';
import AuraQuestions from '@/components/aura/AuraQuestions';
import AuraStickyCartBar from '@/components/aura/AuraStickyCartBar';
import { asset } from '@/lib/asset';

const PANELS = 8;

export default function AuraPage() {
  const mouseProxy = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

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

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    (window as unknown as { __ARTISUN_LENIS__?: Lenis }).__ARTISUN_LENIS__ = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const mm = gsap.matchMedia();

    // ── DESKTOP (>= 1024px): Existing Horizontal Pin Track ──
    mm.add('(min-width: 1024px)', () => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (track && wrapper) {
        const getScrollAmount = () => track.scrollWidth - window.innerWidth;

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
      }
    });

    // ── MOBILE (< 1024px): Clean Natural Vertical Flow (No cut-offs) ──
    mm.add('(max-width: 1023px)', () => {
      // Mobile relies on smooth document flow so all content is fully readable
    });

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      if ('scrollRestoration' in history) history.scrollRestoration = prevRestoration;
      mm.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __ARTISUN_LENIS__?: Lenis }).__ARTISUN_LENIS__;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const goToPanel = (i: number) => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (window.innerWidth >= 1024) {
      const st = stRef.current;
      if (!st) return;
      const target = st.start + (i / (PANELS - 1)) * (st.end - st.start);
      lenis.scrollTo(target, { duration: 1.3 });
    } else {
      const panels = document.querySelectorAll<HTMLElement>('.aura-panel');
      if (panels[i]) {
        lenis.scrollTo(panels[i], { duration: 1.2, offset: 0 });
      }
    }
  };

  return (
    <main className="relative w-full min-h-[100svh] overflow-clip">
      <h1 className="sr-only">Aura — Pearl Sunscreen SPF 40 PA++++</h1>
      <ScrollProgressBar marker={asset('/b1.webp')} markerHeight={13} />
      <div id="global-bg" className="theme-molten-core" />

      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

    <div ref={wrapperRef} className="relative w-full w-full lg:h-[100svh] lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row flex-nowrap w-full lg:h-full will-change-transform"
        >
          <AuraHero onNavigate={goToPanel} />
          <AuraDosage />
          <AuraTexture />
          <AuraWhere />
          <AuraWhatsIn />
          <AuraDiff />
          <AuraProduct />
          <AuraQuestions />
        </div>
      </div>
      <AuraStickyCartBar />
    </main>
  );
}