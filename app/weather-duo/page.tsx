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
    <main className="relative w-full min-h-screen text-[var(--brand-cream)] font-suisse antialiased pb-28 md:pb-24 overflow-x-hidden">
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

      {/* Weather Duo Main Showcase (3 Frames + Sticky Bar) */}
      <WeatherDuoShowcase />
    </main>
  );
}