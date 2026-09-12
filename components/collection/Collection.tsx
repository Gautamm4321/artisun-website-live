'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import AddToBagButton from '@/components/cart/AddToBagButton';
import { asset } from '@/lib/asset';

// ── DATA: TRUST CLAIMS ──
const TRUST_BADGES = [
  'Made in India',
  'In-vitro tested',
  'Non-comedogenic',
  'Vegan, cruelty-free',
  'Zero White Cast',
  'No Parabens',
];

// ── DATA: PRODUCTS ──
const PRODUCTS = [
  {
    id: 'origin',
    name: 'Artisun Origin',
    subtitle: 'Pearl Lotion SPF 50+ · PA++++',
    size: '50ml',
    finish: 'Wears dewy, light & protective',
    price: '₹1,499',
    image: '/pdp/origin-region.webp',
    tag: 'Daily Dewy Finish',
    desc: 'Four-in-one sunscreen, moisturiser, primer, and antioxidant barrier. Disappears cleanly without a trace of white cast.',
  },
  {
    id: 'aura',
    name: 'Artisun Aura',
    subtitle: 'Pearl Skinwear SPF 40 · PA++++',
    size: '50g',
    finish: 'Wears weightless, plush & invisible',
    price: '₹1,799',
    image: '/pdp/aura-1.webp',
    tag: 'Climate-Smart Pearls',
    desc: 'Pearls suspended in hydrating gel. Adjust the amount to the weather—more when dry, fewer when humid.',
  },
  {
    id: 'duo-bundle',
    name: 'The Weather Duo',
    subtitle: 'Origin (50ml) + Aura (50g)',
    size: 'Complete Kit',
    finish: 'Your year-round dual climate wardrobe',
    price: '₹3,298',
    image: '/pdp/aura-last-desktop.webp',
    tag: 'Bundled Savings',
    desc: 'Origin for high sun & commute; Aura for deep hydration & humidity. The complete Indian weather collection.',
  },
];

// ── DATA: CLIENT REVIEWS (All 10 from brief) ──
const REVIEWS = [
  {
    quote: "Expected it to sit heavy in this weather. It doesn't. That's the whole review.",
    author: 'Meher Chandiramani',
    location: 'Mumbai · 30°C',
  },
  {
    quote: 'Bought it for the SPF, kept using it because I stopped needing a separate primer.',
    author: 'Ananya Rege',
    location: 'Pune · 27°C',
  },
  {
    quote: "Third sunscreen this year. First one that didn't go grey on me in photos.",
    author: 'Divya Balakrishnan',
    location: 'Chennai · 33°C',
  },
  {
    quote: "Two pearls, done. Takes ten seconds and I genuinely forget it's on.",
    author: 'Rhea Sabharwal',
    location: 'Delhi · 34°C',
  },
  {
    quote: 'My mother has taken it. I am buying a second one. Make of that what you will.',
    author: 'Ishaan Grover',
    location: 'Chandigarh · 32°C',
  },
  {
    quote: 'Skin looks lit rather than shiny, which I didn’t think was a real distinction until now.',
    author: 'Tanvi Deshmukh',
    location: 'Bengaluru · 26°C',
  },
  {
    quote: 'Used it through two weeks of Bombay humidity. No pilling, no sliding.',
    author: 'Farhan Qureshi',
    location: 'Mumbai · 30°C',
  },
  {
    quote: "Not cheap. Also the only one I've finished the bottle of.",
    author: 'Sneha Bhattacharya',
    location: 'Kolkata · 32°C',
  },
  {
    quote: 'Wore it under makeup for a nine-hour shoot day. Nothing broke up around the nose.',
    author: 'Aditi Menon',
    location: 'Kochi · 29°C',
  },
  {
    quote: 'I have written off about six sunscreens for the smell alone. This one is fine.',
    author: 'Karan Malhotra',
    location: 'Jaipur · 33°C',
  },
];

// ── DATA: FAQS (All 8 from brief) ──
const FAQS = [
  {
    q: 'Which one should I get – Origin or Aura?',
    a: 'Origin if you want a dewy finish and one step that does four things: primer, moisturiser, serum and sun protection. Aura if you want the sunscreen to disappear entirely — nothing to see, nothing to feel. Origin is SPF 50+ PA++++, 50ml, in a glass pump. Aura is SPF 40 PA++++, 50g, in a glass jar with a spatula. Both are non-comedogenic, vegan and in-vivo tested. You’re choosing by finish and by weather, not by skin type.',
  },
  {
    q: 'Is SPF 40 enough, or should I take SPF 50+?',
    a: 'SPF 50+ filters about 98% of UVB. SPF 40 filters about 97.5%. The gap between those two numbers is far smaller than the gap between wearing enough and wearing too little. Artisun Origin is SPF 50+ PA++++ and Aura is SPF 40 PA++++ — both carry the highest UVA rating there is, and UVA is what drives pigmentation and ageing. Take Origin for long stretches outdoors. Take Aura if it’s the one you’ll actually wear every day.',
  },
  {
    q: 'Do these leave a white cast?',
    a: 'No. Neither Artisun Origin nor Aura contains zinc oxide or titanium dioxide. Those are white minerals that sit on the surface of skin, and they are the reason most sunscreens go grey on deeper tones. Both formulas use chemical UV filters instead, which absorb into the film rather than sitting on top of it.',
  },
  {
    q: 'What does 4-in-1 actually mean?',
    a: 'Artisun Origin is a primer, a moisturiser, a serum and a sunscreen in one bottle. Designed as four, worn as one. The step most people skip is now the same step as the ones they don’t.',
  },
  {
    q: 'What’s the difference in finish?',
    a: 'Origin wears dewy — skin looks lit rather than flat, and it holds makeup well because it is also the primer. Aura wears invisible — no shine, no film, nothing on the surface. Neither is a matte finish. If you want skin flattened down, neither of these is that.',
  },
  {
    q: 'Will these work for oily skin? Dry skin? Sensitive skin?',
    a: 'Both Artisun formulas are built for every skin type, and both are non-comedogenic. That is the argument the brand rests on: what should decide your sunscreen is the weather and the day, not a label you were given once at nineteen. Oily skin in Delhi in June and oily skin in Delhi in January want two different things.',
  },
  {
    q: 'How much do I use?',
    a: 'Origin — two pumps, three in dry, cold or high-sun weather. Aura — two pearls in heat and humidity, up to three when it’s cold or dry, one to two through monsoon. Every recommended amount delivers the full tested SPF.',
  },
  {
    q: 'Where are these made?',
    a: 'In India, at a facility in Rudrapur, Uttarakhand. The filters and actives are sourced from Germany, Finland and Japan. Shelf life is 18 months from manufacture.',
  },
];

export default function Collection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative w-full min-h-screen pt-14 md:pt-16 pb-20 font-suisse antialiased text-[#242623]">
      {/* Site-wide Red Eclipse Gradient Background */}
      <div className="artisun-bg pointer-events-none" />

      <div className="relative z-10 w-full space-y-16 sm:space-y-24">

        {/* ══════════════════════════════════════════════════
            1. HERO / COVER SPLIT SECTION (Edge-to-Edge 50/50)
        ══════════════════════════════════════════════════ */}
        <section className="w-full overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[660px]">

            {/* Left Side: Model Background + Bottom-Left Overlay Text */}
            <div className="relative w-full min-h-[420px] sm:min-h-[480px] md:min-h-full overflow-hidden flex flex-col justify-end p-5 sm:p-7 md:p-8 lg:p-10">
              <Image
                src={asset('/skinwear-media/Second picture.webp')}
                alt="Artisun Model"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {/* Bottom Gradient for clear legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

              <div className="relative z-10 w-full max-w-[600px]">
                <h1 className="font-editorial text-[28px] sm:text-[34px] md:text-[38px] lg:text-[45px] xl:text-[48px] leading-[1.08] tracking-tight text-[#F3ECE0] font-normal">
                  Your skin type didn&apos;t change this<br />
                  morning. The weather did.
                </h1>
                <p className="font-suisse text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-[#F3ECE0]/90 leading-snug mt-2.5 sm:mt-3">
                  So we launched two layers. One wears dewy. One<br className="hidden sm:block" />
                  wears invisible. Both are built for Indian weather.
                </p>
              </div>
            </div>

            {/* Right Side: Product Duo Image Edge-to-Edge */}
            <div className="relative w-full min-h-[320px] sm:min-h-[380px] md:min-h-full overflow-hidden bg-[#1f0b09]">
              <Image
                src={asset('/pdp/aura-last-desktop.webp')}
                alt="Artisun Sunscreen Duo Products"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

          </div>
        </section>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 w-full">

</div>

        {/* ══════════════════════════════════════════════════
            2. TRUST BADGES (EDGE-TO-EDGE HORIZONTAL STRIP)
        ══════════════════════════════════════════════════ */}
        <section className="w-full border-y border-white/10 bg-black/25 backdrop-blur-md py-3.5 sm:py-4 px-4 overflow-x-auto no-scrollbar">
          <div className="max-w-[1500px] mx-auto flex items-center justify-between gap-4 sm:gap-6 min-w-max md:min-w-0">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 transition-colors hover:bg-white/[0.12]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9B45] shadow-[0_0_8px_#FF9B45] shrink-0" />
                <span className="font-suisse text-[10px] sm:text-[11px] lg:text-[11.5px] tracking-[0.18em] uppercase font-medium text-white/90 whitespace-nowrap">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 w-full">

          {/* ══════════════════════════════════════════════════
              3. PRODUCT SHOWCASE GRID (3 CARDS + DIRECT BUY)
          ══════════════════════════════════════════════════ */}
          <section id="products" className="w-full space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-editorial text-[32px] sm:text-[44px] leading-tight text-white mt-1">
                  Choose your layer.
                </h2>
              </div>
              <p className="font-suisse text-xs sm:text-sm text-white/80 max-w-[34ch]">
                Every formulation is certified broad spectrum SPF, photostable, and cast-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="group relative flex flex-col justify-between bg-[#E8DAC7] border border-[#242623]/10 rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[9px] uppercase tracking-[0.14em] font-semibold bg-[#242623] text-[#F3ECE0] px-3 py-1 rounded-full">
                      {prod.tag}
                    </span>
                  </div>

                  <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-[#3a2a23]/10 p-4">
                    <Image
                      src={asset(prod.image)}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-editorial text-2xl text-[#242623]">
                          {prod.name}
                        </h3>
                        <span className="font-suisse text-xs text-[#242623]/60">
                          {prod.size}
                        </span>
                      </div>

                      <p className="font-suisse text-[11.5px] uppercase tracking-wider text-[#A52A2C] font-semibold">
                        {prod.subtitle}
                      </p>

                      <p className="font-suisse text-xs text-[#242623]/75 leading-relaxed pt-1">
                        {prod.desc}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#242623]/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-editorial text-xl text-[#242623] font-semibold">
                          {prod.price}
                        </span>
                      </div>

                      <AddToBagButton
                        product={prod.id === 'origin' ? 'origin' : 'aura'}
                        className="pointer-events-auto font-suisse text-[10px] sm:text-xs uppercase tracking-wider px-5 py-2.5 bg-[#242623] text-[#F3ECE0] hover:bg-[#A52A2C] transition-colors font-medium rounded-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════
              4. CUSTOMER REVIEWS (AUTO-SLIDER CAROUSEL)
          ══════════════════════════════════════════════════ */}
          <section className="w-full space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-editorial text-[30px] sm:text-[40px] leading-tight text-white mt-1">
                Tested by 30°C humidity, cold <br /> snaps, and real commutes.
              </h2>
            </div>

            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_2%,black_98%,transparent)]">
              <div className="flex gap-4 w-max animate-carousel hover:[animation-play-state:paused]">
                {[...REVIEWS, ...REVIEWS].map((rev, idx) => (
                  <div
                    key={idx}
                    className="w-[280px] sm:w-[340px] shrink-0 p-6 rounded-2xl bg-[#E8DAC7] backdrop-blur-md border border-[#242623]/10 shadow-sm flex flex-col justify-between"
                  >
                    <p className="font-editorial text-base sm:text-lg leading-snug text-[#242623]">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                    <div className="pt-4 mt-4 border-t border-[#242623]/10 flex items-center justify-between text-xs">
                      <span className="font-suisse font-semibold text-[#242623]">
                        {rev.author}
                      </span>
                      <span className="font-suisse text-[#A52A2C] font-medium text-[11px]">
                        {rev.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════
              5. FAQ SECTION (ACCORDION - PURE WHITE/CREAM TEXT)
          ══════════════════════════════════════════════════ */}
          <section className="w-full max-w-[960px] mx-auto space-y-8">
            <div className="text-center">
              <span className="text-[10px] sm:text-xs tracking-[0.24em] uppercase font-semibold text-white/70">
                Answers
              </span>
              <h2 className="font-editorial text-[32px] sm:text-[42px] leading-tight text-white mt-1">
                Questions people actually ask.
              </h2>
            </div>

            <div className="divide-y divide-white/20 border-y border-white/20">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="py-4 sm:py-5">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between text-left gap-4 group"
                    >
                      <span className="font-editorial text-lg sm:text-xl text-white group-hover:text-white/80 transition-colors">
                        {faq.q}
                      </span>
                      <span className="text-xl font-light text-white/75 shrink-0">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className="font-suisse text-xs sm:text-sm leading-relaxed text-white/85 pt-3">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>

      <style jsx>{`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-carousel {
          animation: carousel 38s linear infinite;
        }
      `}</style>
    </div>
  );
}