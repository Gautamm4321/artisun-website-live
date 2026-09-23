'use client';

import { motion } from 'framer-motion';

export default function ClimateStats() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center px-5 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 text-[var(--brand-cream)]">

      {/* 1. Top Sub-heading / Statement */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1000px] mb-8 md:mb-12 text-left sm:text-center px-1"
      >
        <p className="font-editorial text-[22px] sm:text-2xl md:text-3xl font-normal opacity-95 leading-[1.25] sm:leading-relaxed sm:underline sm:underline-offset-4 decoration-white/80">
          The weather is doing more to your skin than you think.
        </p>
      </motion.div>

      {/* 2. Stats Grid / Mobile Editorial Divider List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-6 w-full max-w-[1000px] justify-items-center"
      >

        {/* CARD 1 */}
        <div className="w-full min-h-0 sm:min-h-[310px] bg-transparent sm:bg-black/25 sm:backdrop-blur-md border-t border-white/20 sm:border sm:border-white/10 rounded-none p-0 py-7 sm:p-6 flex flex-col justify-between shadow-none sm:shadow-2xl sm:hover:border-white/20 transition-all text-left">
          <div>
            <h3 className="font-editorial text-5xl sm:text-5xl md:text-6xl font-normal mb-3 tracking-tight leading-none text-[#F3ECE0]">
              10%
            </h3>
            <p className="font-suisse text-[13.5px] sm:text-base md:text-lg font-normal text-[#F3ECE0]/90 leading-snug max-w-[340px] sm:max-w-none">
              more sebum production takes place for every 1°C rise in the skin temperature.
            </p>
          </div>
          <p className="font-suisse text-[11px] sm:text-xs md:text-sm italic text-[#E8DCC8]/70 text-left sm:text-right mt-4 sm:mt-6 font-normal">
            British Journal of Dermatology, 1970
          </p>
        </div>

        {/* CARD 2 */}
        <div className="w-full min-h-0 sm:min-h-[310px] bg-transparent sm:bg-black/25 sm:backdrop-blur-md border-t border-white/20 sm:border sm:border-white/10 rounded-none p-0 py-7 sm:p-6 flex flex-col justify-between shadow-none sm:shadow-2xl sm:hover:border-white/20 transition-all text-left">
          <div>
            <h3 className="font-editorial text-5xl sm:text-5xl md:text-6xl font-normal mb-3 tracking-tight leading-none text-[#F3ECE0]">
              2 hrs
            </h3>
            <p className="font-suisse text-[13.5px] sm:text-base md:text-lg font-normal text-[#F3ECE0]/90 leading-snug max-w-[340px] sm:max-w-none">
              at 32°C is enough to measurably raise both sebum and inflammation markers in the skin.
            </p>
          </div>
          <p className="font-suisse text-[11px] sm:text-xs md:text-sm italic text-[#E8DCC8]/70 text-left sm:text-right mt-4 sm:mt-6 font-normal">
            Fudan University, Shanghai · Environmental Research, 2025
          </p>
        </div>

        {/* CARD 3 */}
        <div className="w-full min-h-0 sm:min-h-[310px] bg-transparent sm:bg-black/25 sm:backdrop-blur-md border-t border-white/20 sm:border sm:border-white/10 rounded-none p-0 py-7 sm:p-6 flex flex-col justify-between shadow-none sm:shadow-2xl sm:hover:border-white/20 transition-all text-left">
          <div>
            <h3 className="font-editorial text-5xl sm:text-5xl md:text-6xl font-normal mb-3 tracking-tight leading-none text-[#F3ECE0]">
              20%
            </h3>
            <p className="font-suisse text-[13.5px] sm:text-base md:text-lg font-normal text-[#F3ECE0]/90 leading-snug max-w-[340px] sm:max-w-none">
              more pigment spots on the forehead and cheeks, in skin exposed to more traffic particles.
            </p>
          </div>
          <p className="font-suisse text-[11px] sm:text-xs md:text-sm italic text-[#E8DCC8]/70 text-left sm:text-right mt-4 sm:mt-6 font-normal">
            Journal of Investigative Dermatology, 2010
          </p>
        </div>

      </motion.div>

      <div className="w-full max-w-[1000px] border-b border-white/20 sm:hidden" />
    </section>
  );
}