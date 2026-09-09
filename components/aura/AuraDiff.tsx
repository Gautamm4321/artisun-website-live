'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { asset } from '@/lib/asset';
import { usePanelEdgeScroll } from '@/hooks/usePanelEdgeScroll';

export default function AuraDiff() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // usePanelEdgeScroll removed

  return (
    <div className="aura-panel relative w-screen shrink-0 h-auto lg:h-[100svh] overflow-visible lg:overflow-hidden">
      {/* Red Eclipse Background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ background: 'var(--bg-eclipse)' }}
      />

      {/* Main Scroller */}
      <div
        ref={scrollerRef}
        className="w-full h-full flex flex-col justify-center pt-12 pb-8 lg:pt-20 lg:pb-12"
      >
        <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-12 my-auto flex flex-col justify-center">
          
          {/* Section Kicker */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.24em] uppercase font-medium text-[var(--brand-cream)]/70 mb-1 lg:mb-1.5">
            <span className="w-5 h-[1px] bg-current opacity-60" />
            What makes aura different
          </div>

          {/* Headline (Fitted cleanly on desktop) */}
          <h2 className="font-editorial text-[var(--brand-cream)] text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.08] tracking-tight font-normal mb-1.5 lg:mb-2">
            Two things in one pearl: <em className="italic font-light">protection, and skincare.</em>
          </h2>

          {/* Subline */}
          <p className="font-sans text-[var(--brand-cream)]/85 text-[12.5px] sm:text-[13.5px] lg:text-[14px] leading-[1.45] max-w-[820px] font-light mb-4 lg:mb-5">
            Aura is built as pearls suspended in a gel. The dual formula from the pearl protects your skin from UV rays. And the gel looks after your skin from environmental stressors. Here&rsquo;s what&rsquo;s inside each.
          </p>

          {/* Two-Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
            
            {/* Card 1: The Pearl */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden flex flex-col justify-between">
              <div className="relative w-full h-[130px] sm:h-[180px] lg:h-[185px] xl:h-[210px] bg-[#613622] overflow-hidden">
                <Image
                  src={asset('/pdp/aura-1.webp')}
                  alt="The Pearl Macro"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover opacity-90"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3 text-[9px] uppercase tracking-[0.2em] font-medium text-white/60">
                  Image &mdash; The Pearls, Macro
                </span>
              </div>

              <div className="p-4 sm:p-5 lg:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-[10px] sm:text-[11px] font-serif italic text-[#FF9B45] mb-0.5">
                    01 &mdash; The pearl
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[var(--brand-cream)] font-normal mb-1 tracking-tight">
                    The protection.
                  </h3>
                  <p className="font-sans text-xs sm:text-[12.5px] lg:text-[13px] leading-[1.45] text-[var(--brand-cream)]/85 font-light">
                    Every pearl carries the sunscreen: <strong className="text-white font-medium">three broad-spectrum UV filters, including Uvinul A Plus</strong> &mdash; one of the most advanced UVA filters made anywhere in the world. Alongside them, <strong className="text-white font-medium">Beta-Glucan</strong> to support the skin barrier and <strong className="text-white font-medium">Bisabolol</strong> to calm skin against the sting of heat, sun and pollution.
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-white/10">
                  {['Uvinul A Plus', 'Broad-spectrum SPF 40', 'Beta-Glucan', 'Bisabolol'].map((badge) => (
                    <span
                      key={badge}
                      className="text-[9.5px] sm:text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-[var(--brand-cream)]/90"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: The Gel */}
            <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden flex flex-col justify-between">
              <div className="relative w-full h-[130px] sm:h-[180px] lg:h-[185px] xl:h-[210px] bg-[#4a3e2a] overflow-hidden">
                <Image
                  src={asset('/pdp/aura-2.webp')}
                  alt="The Gel Macro"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover opacity-90"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3 text-[9px] uppercase tracking-[0.2em] font-medium text-white/60">
                  Image &mdash; The Gel, Macro
                </span>
              </div>

              <div className="p-4 sm:p-5 lg:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-[10px] sm:text-[11px] font-serif italic text-[#FF9B45] mb-0.5">
                    02 &mdash; The gel
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[var(--brand-cream)] font-normal mb-1 tracking-tight">
                    The skincare.
                  </h3>
                  <p className="font-sans text-xs sm:text-[12.5px] lg:text-[13px] leading-[1.45] text-[var(--brand-cream)]/85 font-light">
                    The gel is where the moisture and defence live: <strong className="text-white font-medium">Ectoin</strong>, one of skincare&rsquo;s most advanced protective actives, built to hold skin through heat, humidity and pollution &mdash; with <strong className="text-white font-medium">Sodium Hyaluronate</strong> for deep, lasting hydration.
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-white/10">
                  {['Ectoin', 'Sodium Hyaluronate', '72-hour hydration'].map((badge) => (
                    <span
                      key={badge}
                      className="text-[9.5px] sm:text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-[var(--brand-cream)]/90"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}