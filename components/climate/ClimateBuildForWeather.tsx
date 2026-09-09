'use client';

import { motion } from 'framer-motion';

export default function ClimateSkinVsWeather() {
  return (
    <section className="relative z-10 w-full flex flex-col items-center justify-center px-6 py-16 md:py-24 overflow-hidden">
      {/* Ghost Background Accent */}
      <div className="absolute right-[-2%] bottom-[-8%] font-editorial italic font-extralight text-[30vw] leading-none text-[#A52A2C] opacity-[0.04] pointer-events-none select-none">
        weather
      </div>

      <div className="w-full max-w-[1180px] mx-auto text-[var(--brand-cream)] space-y-10">
        {/* Eyebrow kicker */}
        <div className="flex items-center gap-3 text-[11px] tracking-[0.28em] uppercase font-semibold text-[#FF9B45] opacity-90">
          <span className="w-6 h-[1px] bg-current opacity-60" />
          Why climate-smart
        </div>

        {/* Main Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="font-editorial text-[clamp(2.2rem,4.8vw,4.6rem)] leading-[1.05] tracking-tight font-normal max-w-[18ch]"
        >
          Why we build for weather, <em className="italic">not just skin type.</em>
        </motion.h2>

        {/* Two-Column Editorial Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 pt-2 items-start">
          {/* Left Column (Lead) with spelling fixes: "oily or dry in", "in a Delhi" */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-sans text-[15px] sm:text-[17px] md:text-[18.5px] leading-[1.65] font-light opacity-90 text-[var(--brand-cream)]"
          >
            Every sunscreen asks the same question: oily or dry? But your skin isn&apos;t oily or dry in a fixed way.{' '}
            <strong className="text-white font-medium">It changes the second the weather does</strong> — tight in a Delhi December, greasy in a Bombay July, dull in the September smog.
          </motion.p>

          {/* Right Column (Turn) with spelling fix: "around climate" */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <p className="font-editorial text-[20px] sm:text-[23px] md:text-[26px] leading-[1.25] tracking-tight text-white">
              Skin type tells you a little. The weather tells you <em className="italic text-[#FF9B45]">everything.</em>
            </p>
            <p className="font-sans text-[14px] sm:text-[15.5px] leading-[1.65] font-light opacity-80 text-[var(--brand-cream)]">
              So we stopped sorting sunscreen by skin, and started building it around climate. That&apos;s climate-smart — the same idea, in two products.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
    </section>
  );
}