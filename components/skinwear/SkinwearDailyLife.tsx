'use client';

import Image from 'next/image';

export default function SkinwearDailyLife() {
  return (
    <section className="relative w-full py-6 sm:py-8 md:py-14 px-4 sm:px-8 md:px-12 lg:px-20 z-[16]">
      <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center text-center">

        {/* 1. TOP LANDSCAPE IMAGE FRAME */}
        <div className="
          w-full relative overflow-hidden rounded-xl shadow-2xl mb-5 sm:mb-6 md:mb-8
          aspect-[16/9] sm:aspect-[2/1] lg:aspect-[21/9]
          max-h-[500px] bg-black/20 border border-white/10 box-border
        ">
          <Image
            src="/skinwear-media/Fifth_last picture.webp"
            alt="What's your skin wearing today"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            className="object-cover object-center w-full h-full"
            priority
          />
        </div>

        {/* 2. EDITORIAL HEADING */}
        <h2 className="
          font-editorial text-[var(--brand-cream)] leading-[1.08] tracking-[-0.02em] mb-2 sm:mb-3
          text-[clamp(1.8rem,7.5vw,5rem)]
          max-w-[320px] sm:max-w-none
        ">
          What&apos;s your skin<br className="sm:hidden" /> wearing today?
        </h2>

        {/* 3. SUBTEXT */}
        <p className="
          font-suisse text-[var(--brand-cream)]/90 font-normal leading-[1.5]
          max-w-[320px] sm:max-w-[540px] md:max-w-[720px]
          text-[14px] sm:text-[16px] md:text-[20px] lg:text-[22px]
          mb-4 sm:mb-5 md:mb-6
        ">
          Before every event, everyone asks what you&apos;re wearing.
          We&apos;re asking the same about your skin.
        </p>

        {/* 4. CTA BUTTONS */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mt-2">
          <a
            href="/origin"
            className="font-suisse text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-none bg-[#EAE3D2] text-[#242623] hover:bg-white transition-colors text-center shrink-0"
          >
            Wear Origin
          </a>

          <a
            href="/aura"
            className="font-suisse text-[11px] sm:text-xs uppercase tracking-[0.14em] font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-none bg-[#EAE3D2] text-[#242623] hover:bg-white transition-colors text-center shrink-0"
          >
            Wear Aura
          </a>
        </div>

      </div>
    </section>
  );
}