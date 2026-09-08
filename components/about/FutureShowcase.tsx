'use client';

import { motion, useReducedMotion } from 'framer-motion';

const rise = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? false : { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function FutureShowcase() {
  const reduce = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden pt-10 pb-16 md:pt-16 md:pb-20">
      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* ── Copy + CTA ── */}
        <div className="w-full text-center mx-auto">
          <motion.div {...rise(0, reduce)} className="mb-1 flex items-center justify-center gap-4">
            <span className="font-suisse uppercase tracking-[0.11em] text-[11px] md:text-[30px] text-[var(--brand-cream)]/70">
              In years to come
            </span>
          </motion.div>

          <motion.h2
            {...rise(0.08, reduce)}
            className="about-shine font-editorial leading-[1.02] tracking-[-0.02em] text-[clamp(2.6rem,6vw,4.6rem)] text-center"
          >
            Artisun is just getting started
          </motion.h2>

          <motion.div {...rise(0.16, reduce)} className="mt-8 space-y-6 font-suisse text-[var(--brand-cream)]/80 text-[15px] sm:text-[16px] md:text-[22px] lg:text-[30px] leading-[1.5] md:leading-[1.4] w-full">
            <p>
              What you see today is the beginning of a longer collection
              <br />
              One focused on suncare and designed as Skinwear&trade;
              <br />
              Different layers for different mornings and different climates,
              <br />
              Each one built to the same standard.
            </p>

            <p>
              Artisun is bringing you two layers to begin.
              <br />
              In years to come, it&rsquo;ll grow with you, for you.
              <br />
              For your skin, your needs and your climate.
            </p>
          </motion.div>

          <motion.div {...rise(0.24, reduce)} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a 
              href="/origin" 
              className="inline-flex items-center justify-center min-w-[180px] px-8 py-3 md:py-3.5 bg-[#E6D5C1] hover:bg-[#FAF6EE] text-[#A52A2C] font-suisse text-[11px] sm:text-[12.5px] lg:text-[13px] tracking-[0.14em] font-medium uppercase shadow-md transition-all duration-300 active:scale-[0.98] text-center whitespace-nowrap"
            >
              Shop Origin
            </a>

            <a 
              href="/aura" 
              className="inline-flex items-center justify-center min-w-[180px] px-8 py-3 md:py-3.5 bg-[#E6D5C1] hover:bg-[#FAF6EE] text-[#A52A2C] font-suisse text-[11px] sm:text-[12.5px] lg:text-[13px] tracking-[0.14em] font-medium uppercase shadow-md transition-all duration-300 active:scale-[0.98] text-center whitespace-nowrap"
            >
              Shop Aura
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}