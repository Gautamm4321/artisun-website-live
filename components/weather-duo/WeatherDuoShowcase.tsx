'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AddToBagButton from '@/components/cart/AddToBagButton';
import { asset } from '@/lib/asset';

const GALLERY_IMAGES = [
  { id: 1, label: 'Both angled', src: '/Bundle image 1 (1).png' },
  { id: 2, label: 'Pearls close', src: '/Bundle image 2.png' },
  { id: 3, label: 'Emulsion texture', src: '/Bundle image 3.jpg' },
  { id: 4, label: 'On skin', src: '/Bundle image 4.png' },
  { id: 5, label: 'Dry vs humid', src: '/Bundle image 5.png' },
  { id: 6, label: 'Both in hand', src: '/Bundle image 6.png' },
];

export default function WeatherDuoShowcase() {
  const [selectedImg, setSelectedImg] = useState<string>(GALLERY_IMAGES[0].src);

  // ── Horizontal Scroll Refs for Desktop ──
  const horizontalContainerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Sirf Desktop (>= 1024px) par horizontal scroll chalega
    mm.add('(min-width: 1024px)', () => {
      if (!horizontalContainerRef.current || !horizontalTrackRef.current) return;

      const track = horizontalTrackRef.current;
      const getTotalScroll = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getTotalScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalContainerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${getTotalScroll()}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    });

    // Images load hone par layout shift / jumping ko refresh karega
    const images = Array.from(document.querySelectorAll('img'));
    let pending = images.filter((img) => !img.complete).length;
    if (pending === 0) {
      ScrollTrigger.refresh();
    } else {
      const onLoad = () => {
        pending -= 1;
        if (pending === 0) ScrollTrigger.refresh();
      };
      images.forEach((img) => {
        if (!img.complete) img.addEventListener('load', onLoad, { once: true });
      });
    }

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* ── DESKTOP HORIZONTAL WRAPPER (Mobile stays normal vertical) ── */}
      <div ref={horizontalContainerRef} className="relative w-full overflow-hidden">
        <div
          ref={horizontalTrackRef}
          className="flex flex-col lg:flex-row lg:w-max lg:h-screen lg:overflow-hidden will-change-transform"
        >
          {/* ── 1. FRAME 1: HERO & GALLERY ── */}
          <section className="relative z-10 w-full lg:w-screen lg:min-w-[100vw] lg:h-screen lg:flex-shrink-0 flex items-center justify-center pt-28 sm:pt-32 lg:pt-28 lg:pb-24 pb-12 px-5 sm:px-8 lg:px-14 border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="max-w-[1180px] w-full mx-auto grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-12 items-center">

              {/* Left: Gallery */}
              <div className="flex flex-col gap-2.5 w-full lg:max-w-[600px] xl:max-w-[850px] mx-auto">
                <div className="relative w-full aspect-square max-h-[54svh] lg:max-h-[66vh] rounded-[14px] overflow-hidden bg-black/40 border border-white/15 shadow-2xl backdrop-blur-sm group">
                  <Image
                    src={asset(selectedImg)}
                    alt="The Weather Duo - Origin + Aura"
                    fill
                    priority
                    className="object-cover transition-all duration-300"
                  />

                  {/* Left Arrow (<) - Desktop Only */}
                  <button
                    type="button"
                    onClick={() => {
                      const cur = GALLERY_IMAGES.findIndex((img) => img.src === selectedImg);
                      const prev = (cur - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
                      setSelectedImg(GALLERY_IMAGES[prev].src);
                    }}
                    aria-label="Previous photo"
                    className="hidden lg:flex absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/45 hover:bg-black/75 border border-white/20 text-[#F3ECE0] items-center justify-center backdrop-blur-sm transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  {/* Right Arrow (>) - Desktop Only */}
                  <button
                    type="button"
                    onClick={() => {
                      const cur = GALLERY_IMAGES.findIndex((img) => img.src === selectedImg);
                      const next = (cur + 1) % GALLERY_IMAGES.length;
                      setSelectedImg(GALLERY_IMAGES[next].src);
                    }}
                    aria-label="Next photo"
                    className="hidden lg:flex absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/45 hover:bg-black/75 border border-white/20 text-[#F3ECE0] items-center justify-center backdrop-blur-sm transition-all opacity-85 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                {/* Thumbnails Strip */}
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                  {GALLERY_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImg(img.src)}
                      className={`relative flex-shrink-0 w-[68px] h-[68px] rounded-[9px] overflow-hidden border snap-start transition-all ${
                        selectedImg === img.src
                          ? 'border-[#F3ECE0] ring-2 ring-[#F3ECE0]/40'
                          : 'border-white/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={asset(img.src)} alt={img.label} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Editorial Details */}
              <div className="flex flex-col gap-4 text-left">
                <span className="text-[11px] tracking-[0.24em] uppercase text-[#E8DCC8]/75 font-medium">
                  Origin &amp; Aura
                </span>

                <h1 className="font-editorial text-[clamp(32px,4.5vw,48px)] leading-[1.05] tracking-tight font-normal text-[#F3ECE0]">
                  The Layers.
                </h1>

                <div className="flex flex-wrap gap-2.5 my-1">
                  <span className="border border-white/20 rounded-full px-4 py-1.5 text-[12.5px] tracking-[0.04em] bg-white/[0.05] text-[#F3ECE0]/90">
                    SUN · RAIN · SMOG
                  </span>
                  <span className="border border-white/20 rounded-full px-4 py-1.5 text-[12.5px] tracking-[0.04em] bg-white/[0.05] text-[#F3ECE0]/90">
                    50ML + 50GM
                  </span>
                </div>

                <p className="text-[17px] font-medium text-[#F3ECE0] leading-snug">
                  Sun, rain and smog don&apos;t ask for the same thing.
                </p>

                <p className="text-[15.5px] leading-relaxed text-[#F3ECE0]/85 font-light">
                  Origin is the milk emulsion for the dry months: high sun, AC indoors, and the smog that settles on skin by November. Aura is the pearl for the wet ones, when the air is thick and anything heavier slides off by noon. Sun, rain, smog. Keep both and you&apos;re dressed for all three.
                </p>

                <div className="flex items-baseline gap-3 pt-2">
                  <b className="font-editorial text-[30px] font-normal text-[#F3ECE0]">₹3,298</b>
                  <span className="text-[13.5px] text-[#F3ECE0]/70 font-light">
                    ₹1,499 + ₹1,799 · both full size
                  </span>
                </div>
              </div>

            </div>
          </section>

          {/* ── 2. FRAME 2: WHY BOTH & DUAL CARDS ── */}
          <section className="relative z-10 w-full lg:w-screen lg:min-w-[100vw] lg:h-screen lg:flex-shrink-0 flex items-center justify-center pt-24 pb-16 lg:pt-24 lg:pb-24 px-5 sm:px-8 lg:px-12 border-b lg:border-b-0 lg:border-r border-white/10 select-none">
            <div className="max-w-[1360px] w-full mx-auto flex flex-col justify-center my-auto">
              
              <div className="space-y-1.5 w-full text-left">
                <span className="text-[10.5px] tracking-[0.24em] uppercase text-[#E8DCC8]/70 font-medium block">
                  Why both
                </span>
                
                <h2 className="font-editorial text-[24px] sm:text-[30px] lg:text-[clamp(28px,2.8vw,38px)] leading-[1.08] font-normal text-[#F3ECE0] lg:whitespace-nowrap tracking-tight">
                  You don&apos;t wear the same thing in May and August.
                </h2>

                <p className="text-[13px] sm:text-[14px] lg:text-[14.5px] leading-relaxed text-[#F3ECE0]/85 font-light max-w-[110ch] pt-0.5">
                  Your skin doesn&apos;t either. The sun is the one constant. Everything around it changes: sticky in August, hazy and dry by November. One texture is built for each, and owning both is how you stop compromising for nine months of the year.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-5 lg:mt-6 w-full">
                {/* Card 1: Origin */}
                <article className="border border-white/15 rounded-[16px] overflow-hidden bg-black/40 backdrop-blur-md shadow-xl hover:border-white/25 transition-all flex flex-col">
                  <Link href="/origin" className="relative w-full aspect-[16/8.2] max-h-[145px] sm:max-h-[165px] lg:max-h-[185px] bg-[#1a0504] block cursor-pointer group overflow-hidden">
                    <Image
                      src={asset('/origin-shop-1.jpg')}
                      alt="Origin Dry Heat"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>
                  <div className="p-3.5 sm:p-4 lg:p-4.5 flex flex-col gap-1 flex-1 justify-between text-left">
                    <div>
                      <span className="text-[9.5px] sm:text-[10px] tracking-[0.18em] uppercase text-[#E8DCC8]/75 font-medium">
                        Dry heat · air conditioning · smog days
                      </span>
                      <h3 className="font-editorial text-lg sm:text-xl lg:text-[22px] text-[#F3ECE0] mt-0.5">
                        Origin
                      </h3>
                      <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] leading-relaxed text-[#F3ECE0]/80 font-light mt-0.5">
                        A milk emulsion doing four jobs: serum, moisturiser, sunscreen, primer. Goes on first, on clean skin, alone or under makeup.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2 pt-1 border-t border-white/10">
                      <span className="border border-white/20 rounded-full px-2.5 py-0.5 text-[10.5px] text-[#F3ECE0]/90 bg-white/[0.04]">
                        Pollution defence
                      </span>
                      <span className="border border-white/20 rounded-full px-2.5 py-0.5 text-[10.5px] text-[#F3ECE0]/90 bg-white/[0.04]">
                        Barrier repair
                      </span>
                      <span className="border border-white/20 rounded-full px-2.5 py-0.5 text-[10.5px] text-[#F3ECE0]/90 bg-white/[0.04]">
                        Sits under makeup
                      </span>
                    </div>
                  </div>
                </article>

                {/* Card 2: Aura */}
                <article className="border border-white/15 rounded-[16px] overflow-hidden bg-black/40 backdrop-blur-md shadow-xl hover:border-white/25 transition-all flex flex-col">
                  <Link href="/aura" className="relative w-full aspect-[16/8.2] max-h-[145px] sm:max-h-[165px] lg:max-h-[185px] bg-[#1a0504] block cursor-pointer group overflow-hidden">
                    <Image
                      src={asset('/aura-coll-1.jpg')}
                      alt="Aura Pearl Humid Day"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>
                  <div className="p-3.5 sm:p-4 lg:p-4.5 flex flex-col gap-1 flex-1 justify-between text-left">
                    <div>
                      <span className="text-[9.5px] sm:text-[10px] tracking-[0.18em] uppercase text-[#E8DCC8]/75 font-medium">
                        Dual hydration · humidity
                      </span>
                      <h3 className="font-editorial text-lg sm:text-xl lg:text-[22px] text-[#F3ECE0] mt-0.5">
                        Aura Pearl
                      </h3>
                      <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] leading-relaxed text-[#F3ECE0]/80 font-light mt-0.5">
                        Pearls you can see and count, held in a barrier-repairing gel. They break on skin, sink in, and leave nothing behind.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2 pt-1 border-t border-white/10">
                      <span className="border border-white/20 rounded-full px-2.5 py-0.5 text-[10.5px] text-[#F3ECE0]/90 bg-white/[0.04]">
                        Humidity defence
                      </span>
                      <span className="border border-white/20 rounded-full px-2.5 py-0.5 text-[10.5px] text-[#F3ECE0]/90 bg-white/[0.04]">
                        Calms &amp; repairs
                      </span>
                    </div>
                  </div>
                </article>
              </div>

            </div>
          </section>

          {/* ── 3. FRAME 3: LINKS & FAQ ── */}
          <section className="relative z-10 w-full lg:w-screen lg:min-w-[100vw] lg:h-screen lg:flex-shrink-0 flex items-center justify-center py-10 lg:py-0 px-5 sm:px-8 lg:px-14 border-b lg:border-b-0 border-white/10 lg:overflow-hidden select-none">
            <div className="max-w-[880px] w-full mx-auto flex flex-col justify-center">

              <div className="border-t border-b border-white/20 divide-y divide-white/20 w-full">
                <Link
                  href="/origin"
                  className="flex items-center justify-between py-4 sm:py-5 text-base sm:text-lg lg:text-[19px] font-editorial text-[#F3ECE0] hover:text-[#E8DCC8] transition-colors group"
                >
                  <span className="tracking-wide">Origin, in full</span>
                  <span className="text-[17px] font-light opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </Link>

                <Link
                  href="/aura"
                  className="flex items-center justify-between py-4 sm:py-5 text-base sm:text-lg lg:text-[19px] font-editorial text-[#F3ECE0] hover:text-[#E8DCC8] transition-colors group"
                >
                  <span className="tracking-wide">Aura Pearl, in full</span>
                  <span className="text-[17px] font-light opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </Link>

                <div className="py-5 sm:py-6 flex flex-col gap-1.5 text-left">
                  <b className="font-editorial text-base sm:text-lg lg:text-[19px] text-[#F3ECE0] font-normal tracking-wide">
                    Which one do I start with?
                  </b>
                  <p className="font-suisse text-[13.5px] sm:text-[15px] text-[#F3ECE0]/80 leading-relaxed font-light">
                    Origin in the morning, on clean skin. Aura when the air is heavy, or over the top later in the day.
                  </p>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>

      {/* ── STICKY BOTTOM BAR ── */}
      <div className="fixed left-0 right-0 bottom-0 z-40 flex items-center justify-between gap-2 bg-[#180307]/95 backdrop-blur-md border-t border-white/10 px-4 sm:px-8 py-1.5 sm:py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-[5px] overflow-hidden border border-white/15 flex-shrink-0 bg-[#2a0e0b]">
            <Image
              src={asset('/Collection page right.png')}
              alt="The Layers"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-editorial text-[13.5px] sm:text-[15px] tracking-wide text-[#F3ECE0] whitespace-nowrap">
            WETHER DUO
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <span className="font-editorial text-[15px] sm:text-[17px] text-[#F3ECE0] font-normal whitespace-nowrap">
            ₹3,298
          </span>
          <AddToBagButton
            product="origin"
            className="!bg-[#E6D5C1] !text-[#A52A2C] hover:!bg-[#FAF6EE] text-[10.5px] sm:text-[11px] uppercase tracking-wider font-semibold px-3 sm:px-4 py-1.5 rounded-none"
          />
        </div>
      </div>
    </>
  );
}