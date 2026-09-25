'use client';

import { useState } from 'react';
import Image from '@/components/media/SizedImage';
import { asset } from '@/lib/asset';

type IngredientItem = {
  name: string;
  country: string;
  hook: string;
  detail: string;
  image: string;
};

const INGREDIENTS_DATA: IngredientItem[] = [
  {
    name: 'Beta-Glucan',
    country: 'Finland',
    hook: ' Finland’s finest cosmetic beta-glucan.',
    detail:
      'Strengthens the barrier and locks in moisture — deeper and longer than hyaluronic acid.',
    image: asset('/beta.webp'),
  },
  {
    name: 'Camellia Sinensis',
    country: 'Japan',
    hook: 'Japanese green tea at its most concentrated. ',
    detail:
      'Up to 100× the antioxidant power of vitamin E, taking on the pollution your skin meets every day.',
    image: asset('/camelia.webp'),
  },
  {
    name: 'Uvinul A Plus',
    country: 'Germany',
    hook: 'One of the most advanced UVA filters made. ',
    detail:
      'It holds in sunlight instead of fading the protection you put on at eight is still there at four.',
    image: asset('/unival.webp'),
  },
  {
    name: 'Betaine',
    country: 'Finland',
    hook: 'A natural humectant from sugar beet. ',
    detail:
      "Pulls moisture into the skin and holds it there as the weather shifts through the day.",
    image: asset('/betaine.webp'),
  },
];

export default function OriginWhatsIn() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      id="origin-whatsin"
      className="origin-panel relative w-screen shrink-0 h-screen scroll-mt-[72px] lg:scroll-mt-0 overflow-hidden flex flex-col justify-start lg:justify-center pt-20 pb-16 sm:pt-24 sm:pb-20"
    >
      {/* Background Radial Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'var(--bg-eclipse)',
        }}
      />
      <div className="relative z-10 w-full max-w-[1500px] md:max-w-[740px] lg:max-w-[1500px] mx-auto px-4 sm:px-8 md:px-6 lg:px-14 flex flex-col justify-start md:justify-center lg:justify-center h-full overflow-y-auto md:overflow-hidden lg:overflow-visible pb-0 [scrollbar-width:none]">
        <div className="mb-2 sm:mb-4 md:mb-5 lg:mb-10 shrink-0 mt-0 lg:mt-0 text-left md:text-center lg:text-left">
          <h2 className="font-editorial text-[var(--brand-cream)] text-[30px] sm:text-[46px] md:text-[42px] lg:text-[58px] leading-[1.08] lg:leading-[1.03] tracking-tight not-italic">
            The good version of everything.
          </h2>
        </div>

        {/* ── Cards Container: 4 Rows in 1 Frame on Mobile | 2x2 Squares on Tablet | 4 Columns on Desktop ── */}
        <div
          className="flex-1 md:flex-none lg:flex-initial flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 gap-2 md:gap-3.5 lg:gap-6 items-stretch lg:items-start overflow-hidden lg:overflow-visible w-full"
        >

          {INGREDIENTS_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.name}
                className="group relative w-full flex flex-col bg-white/[0.06] border border-[#E6D5C1]/15 backdrop-blur-md rounded-lg md:rounded-2xl lg:rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#E6D5C1]/30 shadow-xl flex-1 md:flex-none lg:flex-none min-h-0"
              >
                {/* ── MOBILE VIEW ONLY (<768px): Horizontal Banners ── */}
                <div 
                  onClick={() => toggleAccordion(idx)}
                  className="md:hidden relative w-full h-[190px] sm:h-[205px] shrink-0 overflow-hidden flex flex-row cursor-pointer select-none"
                >
                  {/* Image Section with explicit absolute inset */}
                  <div className={`relative h-full transition-all duration-500 ease-out overflow-hidden shrink-0 ${isOpen ? 'w-[42%]' : 'w-full'}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-[1]" />

                    {/* Top-Left: Country Badge */}
                    <span className="absolute top-2.5 left-2.5 z-10 font-suisse text-[8.5px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-[#E6D5C1]/20 text-[#E8DCC8]/95">
                      {item.country}
                    </span>

                    {/* SEO: only the desktop layout uses <h3> for ingredient names. The mobile and
                        tablet copies use <p> with identical classes, so they look the same but
                        Google no longer sees each heading three times. */}
                    {/* Closed State: Ingredient Name at Bottom-Right */}
                    {!isOpen && (
                      <div className="absolute bottom-2.5 right-3 z-10 text-right max-w-[70%]">
                        <p className="font-suisse font-semibold text-[#E8DCC8] tracking-tight text-[13px] sm:text-[14px] leading-tight drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
                          {item.name}
                        </p>
                      </div>
                    )}

                    {/* Opened State: Ingredient Name at Bottom-Left */}
                    {isOpen && (
                      <div className="absolute bottom-2 left-2.5 z-10 max-w-[90%] text-left">
                        <p className="font-suisse font-semibold text-[#E8DCC8] tracking-tight text-[11px] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          {item.name}
                        </p>
                      </div>
                    )}

                    {/* Floating Right Arrow */}
                    {!isOpen && (
                      <div className="absolute right-3 top-2.5 z-10 w-5 h-5 rounded-full bg-black/50 backdrop-blur-md border border-[#E6D5C1]/20 flex items-center justify-center text-[#E8DCC8]/90">
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Right Half: Hook & Description */}
                  {isOpen && (
                    <div className="w-[58%] h-full flex flex-col justify-center px-3.5 py-2 bg-black/75 backdrop-blur-md border-l border-[#E6D5C1]/15 overflow-hidden">
                      <div className="overflow-y-auto max-h-full pr-1 [scrollbar-width:none] space-y-1.5">
                        <p className="font-suisse text-[9.5px] text-[#E8DCC8] font-medium leading-[1.35]">
                          {item.hook}
                        </p>
                        <p className="font-suisse text-[9px] text-[#E8DCC8]/85 leading-[1.35]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── TABLET VIEW ONLY (768px - 1023px): SQUARES IN 2x2 GRID ── */}
                <div
                  onClick={() => toggleAccordion(idx)}
                  className="hidden md:flex lg:hidden relative w-full aspect-square max-h-[33vh] overflow-hidden flex-col justify-between p-4 cursor-pointer select-none group/tab"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority={idx === 0}
                    sizes="50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover/tab:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/25 z-[1]" />

                  {/* Top Bar: Country badge + Action button */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="font-suisse text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E6D5C1]/25 text-[#E8DCC8]/95 font-medium">
                      {item.country}
                    </span>

                    <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-[#E6D5C1]/25 flex items-center justify-center text-[#E8DCC8]">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-300 ${isOpen ? '-rotate-90' : 'rotate-0'}`}
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="relative z-10 text-left">
                    <p className="font-editorial text-[22px] text-[#E8DCC8] tracking-tight leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      {item.name}
                    </p>
                    <p className="font-suisse text-[12px] leading-[1.35] text-[#E8DCC8]/85 mt-1 line-clamp-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                      {item.hook}
                    </p>
                  </div>

                  {/* Overlay on Open: Shows full detail with matching phone red eclipse background */}
                  {isOpen && (
                    <div
                      className="absolute inset-0 z-20 p-5 flex flex-col justify-between border border-[#E6D5C1]/20 transition-all duration-300 animate-in fade-in"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 25%, rgba(185, 30, 15, 0.75) 0%, rgba(77, 0, 7, 0.95) 55%, rgba(18, 2, 3, 0.99) 100%)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-suisse text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E6D5C1]/25 text-[#E8DCC8]/95 font-medium">
                          {item.country}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-[#E6D5C1]/25 flex items-center justify-center text-[#E8DCC8]/90">
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="-rotate-90"
                          >
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </div>
                      </div>

                      <div className="my-auto py-1">
                        <p className="font-editorial text-[23px] text-[#E8DCC8] tracking-tight leading-tight">
                          {item.name}
                        </p>
                        <p className="font-suisse text-[12.5px] text-[#E8DCC8] font-medium leading-[1.35] mt-1">
                          {item.hook}
                        </p>
                        <div className="h-px w-full bg-[#E6D5C1]/20 my-2.5" />
                        <p className="font-suisse text-[12px] leading-[1.45] text-[#E8DCC8]/90">
                          {item.detail}
                        </p>
                      </div>

                      <span className="font-suisse text-[9.5px] tracking-wider uppercase text-[#E8DCC8]/50 text-center">
                        Tap to close
                      </span>
                    </div>
                  )}
                </div>

                {/* ── DESKTOP VIEW (100% Original untouched) ── */}
                <div className="hidden lg:flex lg:flex-col w-full">
                  <div className="relative w-full aspect-[4/6] max-h-[44vh] overflow-hidden bg-black/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <span className="absolute top-3.5 left-3.5 font-suisse text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-[#E6D5C1]/20 text-[#E8DCC8]/90">
                      {item.country}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col bg-black/25 border-t border-[#E6D5C1]/10">
                    <div
                      onClick={() => toggleAccordion(idx)}
                      className="flex items-start justify-between gap-3 cursor-pointer select-none"
                    >
                      {/* Name + byline. The hook used to appear only after the +
                          was pressed; it now reads alongside the name so the card
                          means something at a glance. It is removed from the
                          expanded panel below to avoid showing twice. */}
                      <div className="min-w-0">
                        <h3 className="font-suisse font-medium text-[16px] text-[var(--brand-cream)] tracking-tight">
                          {item.name}
                        </h3>
                        <p className="font-suisse text-[11.5px] leading-[1.35] text-[var(--brand-cream)]/70 mt-1">
                          {item.hook}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Toggle details"
                        className="w-6 h-6 rounded-full flex items-center justify-center bg-white/10 border border-[#E6D5C1]/20 text-[#E8DCC8] hover:bg-white/25 transition-all duration-300 shrink-0"
                      >
                        <svg
                          className={`w-2.5 h-2.5 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        >
                          <line x1="6" y1="1" x2="6" y2="11" />
                          <line x1="1" y1="6" x2="11" y2="6" />
                        </svg>
                      </button>
                    </div>

                    <div
                      className={`grid transition-[grid-template-rows] duration-400 ease-out ${isOpen ? 'grid-rows-[1fr] mt-2.5 pt-2.5 border-t border-[#E6D5C1]/10' : 'grid-rows-[0fr]'
                        }`}
                    >
                      <div className="overflow-hidden max-h-[16vh] overflow-y-auto [scrollbar-width:none]">
                        <p className="font-suisse text-[11px] text-[var(--brand-cream)]/75 leading-[1.45]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}