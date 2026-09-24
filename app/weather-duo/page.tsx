'use client';

import { useEffect, useRef } from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import CustomCursor from '@/components/CustomCursor';
import WeatherDuoShowcase from '@/components/weather-duo/WeatherDuoShowcase';

export default function WeatherDuoPage() {
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
    <main className="relative w-full min-h-screen text-[var(--brand-cream)] font-suisse antialiased overflow-x-clip">
      {/* Mood Red Eclipse Background */}
      <div
        className="fixed inset-0 pointer-events-none -z-20 theme-red-eclipse"
        style={{
          background: `radial-gradient(circle at 50% 80vh,
            #FF2A17 0vh,
            #A4000F 30vh,
            #4D0007 55vh,
            #220003 80vh,
            #090506 100vh)`,
        }}
      />

      {/* Soft Animated Light Sweep */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          left: '-10vw',
          width: '120vw',
          background: 'radial-gradient(ellipse at 50% 70vh, rgba(255,100,40,0.08), transparent 60%)',
          animation: 'moveLightX 25s ease-in-out infinite',
        }}
      />

      {/* Cursor & Header */}
      <CustomCursor mouseProxy={mouseProxy} />
      <GlobalHeader />

      {/* ── Mobile & tablet (<1024px): same scroll model as Origin / Aura ──
          html/body are locked and #wd-scroll-container (fixed, 100svh) is the
          only scroll container. Content can then never scroll up past the
          fixed header into the browser's top bar area, which is what was
          showing through above the header on mobile.
          Desktop (>=1024px): untouched — normal page scroll drives the GSAP
          horizontal track. No bottom padding there, so once the horizontal
          scroll ends there is nothing left to scroll vertically and frame 2
          stays put instead of sliding up. */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          html,
          body {
            overflow: hidden !important;
          }
          #wd-scroll-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100svh;
            overflow-y: auto;
            overflow-x: hidden;
            overscroll-behavior-y: contain;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
      <div id="wd-scroll-container" data-scroll-frame="" className="pb-28 md:pb-24 lg:pb-0">
        {/* Weather Duo Main Showcase (3 Frames + Sticky Bar) */}
        <WeatherDuoShowcase />
      </div>
    </main>
  );
}