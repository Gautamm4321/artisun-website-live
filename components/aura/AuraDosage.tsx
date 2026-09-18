'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';
import { usePanelEdgeScroll } from '@/hooks/usePanelEdgeScroll';

type PearlTab = {
  pearls: number;
  label: string;
  weather: string;
  desc: string;
  image: string;
};

const PEARL_TABS: PearlTab[] = [
  {
    pearls: 1,
    label: '1 Pearl',
    weather: 'Humid & Sticky',
    desc: 'Light, weightless coverage for high humidity days when skin needs minimal layers.',
    image: '/pdp/aura-dosage.webp',
  },
  {
    pearls: 2,
    label: '2 Pearls',
    weather: 'Mild & Everyday',
    desc: 'Two pearls when it’s humid. Perfect balance for your standard daily commute.',
    image: '/pdp/aura-dosage.webp',
  },
  {
    pearls: 3,
    label: '3 Pearls',
    weather: 'Dry & Cold Winter',
    desc: 'Three when it’s dry. Deeper hydration so you are never under-protected in a Delhi winter.',
    image: '/pdp/aura-dosage.webp',
  },
];

export default function AuraDosage() {
  const [activeTab, setActiveTab] = useState(1);
  const scrollerRef = useRef<HTMLDivElement>(null);
// usePanelEdgeScroll removed

  const current = PEARL_TABS[activeTab];

  return (
    <div
      id="aura-dosage"
      ref={scrollerRef}
      className="aura-panel relative w-screen shrink-0 min-h-[100svh] lg:h-[100svh] overflow-visible lg:overflow-hidden flex flex-col justify-start lg:justify-between pt-8 pb-8 sm:py-16 lg:py-20 px-5 sm:px-8 lg:px-14 text-[var(--brand-cream)]"
      style={{ background: 'var(--bg-eclipse)' }}
    >
      {/* Top Heading */}
      <div className="relative z-10 max-w-[1500px] w-full mx-auto pt-0 lg:pt-10">
        <div className="w-full max-w-[540px]">
          <span className="font-suisse text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[var(--brand-cream)]/70">
            How to wear
          </span>
          <h2 className="font-editorial text-[26px] sm:text-[40px] lg:text-[52px] leading-[1.08] tracking-tight mt-1 text-[#E8DCC8]">
            The first sunscreen that changes with the weather.
          </h2>
          <p className="font-suisse text-[11.5px] sm:text-[13.5px] text-[var(--brand-cream)]/80 mt-1.5 leading-[1.45]">
            Aura comes as tiny pearls you can see and count — so you choose how many to wear based on the weather you’re in. Here’s how many to take for each kind of weather:
          </p>
        </div>
      </div>

      {/* Center Grid: Vertical Stack on Right & Sharp Image on Left */}
      <div className="relative z-10 max-w-[1500px] w-full mx-auto my-2 lg:my-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-14 items-stretch pt-2 lg:pt-4">
        
        {/* Left: Image Card (Sharp Corners) */}
        <div className="relative w-full h-[220px] sm:h-[260px] lg:h-full min-h-0 overflow-hidden shadow-2xl bg-black/20 flex items-center justify-center transition-all duration-500">
          <Image
            key={current.image}
            src={asset(current.image)}
            alt={current.label}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-all duration-700 ease-out"
            priority
          />

          {/* Bottom Card Glass Overlay */}
          <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-4 border border-white/10 z-20">
            <span className="font-editorial text-[#E8DCC8] text-base sm:text-lg block font-semibold">
              {current.weather}
            </span>
            <span className="font-suisse text-[11px] sm:text-xs text-[var(--brand-cream)]/85 block mt-0.5 leading-snug">
              {current.desc}
            </span>
          </div>
        </div>

        {/* Right: Vertical Stacked Tabs */}
        <div className="flex flex-col justify-center space-y-4 w-full max-w-[520px]">
          <p className="font-suisse text-xs uppercase tracking-[0.18em] opacity-75">
            Select Amount:
          </p>

          <div className="flex flex-col gap-3 w-full">
            {PEARL_TABS.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`w-full py-3.5 px-5 border flex items-center justify-between backdrop-blur-md transition-all duration-300 ${
                    isActive
                      ? 'bg-[#E8DCC8] text-[#2A0805] border-[#E8DCC8] shadow-xl'
                      : 'bg-white/[0.05] text-[var(--brand-cream)]/85 border-white/15 hover:border-white/40 hover:bg-white/[0.1]'
                  }`}
                >
                  <div className="text-left">
                    <span className="font-suisse text-xs sm:text-sm uppercase tracking-wider font-semibold block">
                      {tab.label}
                    </span>
                  </div>
                  <span className="font-editorial text-2xl sm:text-3xl leading-none font-medium">
                    {tab.pearls}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Lines */}
          <div className="pt-3 border-t border-white/15 space-y-1">
            <p className="font-editorial text-base sm:text-lg non-italic text-[var(--brand-cream)]/90">
              One sunscreen. Every season. Never the wrong amount.
            </p>
            <p className="font-suisse text-[11px] sm:text-xs text-[var(--brand-cream)]/60">
              Applied with the spatula, melts on contact.
            </p>
          </div>
        </div>

      </div>

<div className="hidden lg:block relative z-10 max-w-[1500px] w-full mx-auto pt-2" />
    </div>
  );
}