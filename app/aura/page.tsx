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
import AuraDiff from '@/components/aura/AuraDiff';
import AuraDosage from '@/components/aura/AuraDosage';
import AuraTexture from '@/components/aura/AuraTexture';
import AuraWhere from '@/components/aura/AuraWhere';
import AuraWhatsIn from '@/components/aura/AuraWhatsIn';
import AuraProduct from '@/components/aura/AuraProduct';
import AuraQuestions from '@/components/aura/AuraQuestions';
import AuraStickyCartBar from '@/components/aura/AuraStickyCartBar';
import { asset } from '@/lib/asset';
import { trackViewItem } from '@/lib/analytics';

const PANELS = 8;

export default function AuraPage() {
  const mouseProxy = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  // E-commerce View Item Analytics Tracking
  useEffect(() => {
    trackViewItem({
      id: 'aura-spf40',
      name: 'Aura Pearl Sunscreen SPF 40 PA++++',
      price: 1299,
      category: 'Sunscreen',
      variant: '50ml',
    });
  }, []);

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

    // ── Mobile (<1024px): same iOS-26 chrome fix as the Origin page. ──
    // html/body are locked and the wrapper div ([data-scroll-frame], see
    // globals.css) becomes the page's fixed 100svh scroll container, so no
    // content ever scrolls past the viewport into Safari's translucent
    // status bar / tab bar zones — they stay clean and dark. Lenis is only
    // created on desktop, exactly like Origin: on mobile the container
    // scrolls natively and Lenis would just fight it.
    const isMobile = window.innerWidth < 1024;
    document.documentElement.classList.add('has-scroll-frame');

    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;
      (window as unknown as { __ARTISUN_LENIS__?: Lenis }).__ARTISUN_LENIS__ = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      raf = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

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
      lenis?.scrollTo(0, { immediate: true });
      if (wrapperRef.current) wrapperRef.current.scrollTop = 0;
      ScrollTrigger.refresh();
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      if ('scrollRestoration' in history) history.scrollRestoration = prevRestoration;
      document.documentElement.classList.remove('has-scroll-frame');
      mm.revert();
      if (raf) gsap.ticker.remove(raf);
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
        delete (window as unknown as { __ARTISUN_LENIS__?: Lenis }).__ARTISUN_LENIS__;
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const goToPanel = (i: number) => {
    if (window.innerWidth >= 1024) {
      const lenis = lenisRef.current;
      const st = stRef.current;
      if (!lenis || !st) return;
      const target = st.start + (i / (PANELS - 1)) * (st.end - st.start);
      lenis.scrollTo(target, { duration: 1.3 });
    } else {
      // Mobile: the wrapper ([data-scroll-frame]) is the scroll container —
      // scroll it directly, same as Origin's snap container.
      const wrapper = wrapperRef.current;
      const panels = document.querySelectorAll<HTMLElement>('.aura-panel');
      if (wrapper && panels[i]) {
        // The fixed GlobalHeader overlays the top of this scroll frame, so land
        // the panel's top edge just below the header rather than at y=0 —
        // otherwise its eyebrow/heading sits hidden behind the header.
        // Measured at click time so it stays exact for the phone and tablet
        // header heights. (CSS scroll-margin-top can't do this here: it is
        // only honoured by anchor jumps / scrollIntoView, not scrollTo({top}).)
        const header = document.querySelector<HTMLElement>('[data-site-header]');
        const headerOffset = header
          ? Math.max(0, header.getBoundingClientRect().bottom - wrapper.getBoundingClientRect().top)
          : 0;
        wrapper.scrollTo({
          top: Math.max(0, panels[i].offsetTop - headerOffset),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <main className="relative w-full min-h-[100svh] overflow-clip">
      <ScrollProgressBar marker={asset('/b1.webp')} markerHeight={13} />
      <div id="global-bg" className="theme-molten-core" />

      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

    <div ref={wrapperRef} data-scroll-frame="" className="relative w-full lg:h-[100svh] lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row flex-nowrap w-full lg:h-full will-change-transform"
        >
          <AuraHero onNavigate={goToPanel} />
          <AuraDiff />
          <AuraDosage />
          <AuraTexture />
          <AuraWhere />
          <AuraWhatsIn />
          <AuraProduct />
          <AuraQuestions />
        </div>
      </div>
      <AuraStickyCartBar />
    </main>
  );
}