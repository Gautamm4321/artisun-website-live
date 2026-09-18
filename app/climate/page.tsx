'use client';

import { useEffect, useRef } from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import Footer from '../../components/Footer';
import MobileScrollFrame from '../../components/MobileScrollFrame';
import CustomCursor from '../../components/CustomCursor';
import ScrollProgressBar from '../../components/ScrollProgressBar';

// 1. ClimateHero Component Import
import ClimateHero from '../../components/climate/ClimateHero';
import ClimateBuildForWeather from '../../components/climate/ClimateBuildForWeather';
import ClimatePartOfSkincare from '../../components/climate/ClimatePartOfSkincare';
import ClimateStats from '../../components/climate/ClimateStats';
import ClimateRoutineGallery from '../../components/climate/ClimateRoutineGallery';
import ClimateCTA from '../../components/climate/ClimateCTA';

export default function ClimatePage() {
    const mouseProxy = useRef({ x: 0, y: 0, px: 0, py: 0 });

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

    return (
        <main className="relative w-full min-h-[100svh] overflow-clip">
            {/* Mood: Red Eclipse — fixed so it holds all the way down the page */}
            <div className="artisun-bg" aria-hidden />
            {/* Scroll Progress Bar */}
            <ScrollProgressBar />

            {/* Cursor & Header */}
            <CustomCursor mouseProxy={mouseProxy} />
            <GlobalHeader />

      {/* Tablet scroll snap style matching Aura & Origin */}
      <style jsx global>{`
  @media (min-width: 768px) and (max-width: 1023px) {
    html, body {
      overflow: hidden !important;
    }

    [data-scroll-frame] {
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

    .climate-panel {
      height: 100svh !important;
      max-height: 100svh !important;
      overflow: hidden !important;
      scroll-snap-align: start;
      scroll-snap-stop: always;
    }

    /* Guard against Framer Motion inline opacity:0 getting stuck on tablet */
    .climate-panel [style*="opacity: 0"],
    .climate-panel [style*="opacity:0"] {
      opacity: 1 !important;
      transform: none !important;
    }

    footer {
      scroll-snap-align: start;
    }
  }
`}</style>

      {/* iOS 26 chrome fix: on mobile every scrollable section lives
          inside this fixed 100svh frame (see MobileScrollFrame), so no
          content ever slides behind Safari's translucent status bar or
          bottom controls — same mechanic as the Origin page. Desktop
          renders it as a plain div and is unaffected. */}
      <MobileScrollFrame>
        {/* SECTION 1: Climate Hero Widget */}
        <ClimateHero />

        {/* SECTION 2: Why We Build for Weather */}
        <ClimateBuildForWeather />

        {/* SECTION 3: Climate is Part of Skincare */}
        <ClimatePartOfSkincare />

        {/* SECTION 4: Climate Stats */}
        <ClimateStats />

        {/* SECTION 5: Routine Gallery + CTA (Single unified section on tablet) */}
        <div className="climate-panel contents md:flex md:flex-col md:justify-center md:items-center md:gap-4 md:h-[100svh] md:max-h-[100svh] md:overflow-hidden md:py-4 lg:contents">
          <ClimateRoutineGallery />
          <ClimateCTA />
        </div>

        {/* Footer */}
        <Footer />
      </MobileScrollFrame>
    </main>
  );
}