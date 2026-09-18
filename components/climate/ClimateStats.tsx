'use client';

import { motion } from 'framer-motion';

export default function ClimateStats() {
  return (
    <section className="climate-panel relative w-full flex flex-col items-center justify-center px-4 md:px-8 py-12 md:py-0 md:h-[100svh] md:max-h-[100svh] md:overflow-hidden text-[var(--brand-cream)]">

      {/* 1. Top Sub-heading / Statement */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-[1100px] md:max-w-[850px] mb-8 md:mb-10 space-y-3 font-sans px-2"
      >
        
        <p className="text-lg sm:text-2xl md:text-[28px] font-normal opacity-95 underline underline-offset-4 leading-relaxed decoration-white/80">
          Understanding the skin means understanding the conditions it lives in.
        </p>
      </motion.div>

      {/* 2. Responsive Cards Grid: Square in 1-line layout (sm:grid-cols-3), Rectangle stacked on small screens */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-5 w-full max-w-[1000px] md:max-w-[880px] justify-items-center"
      >

        {/* CARD 1 */}
        <div className="w-full min-h-0 sm:min-h-[310px] md:min-h-[360px] bg-black/25 backdrop-blur-md border border-white/10 rounded-none p-5 sm:p-6 md:p-6 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all">
          <div>
            <h3 className="font-editorial text-4xl sm:text-5xl md:text-[58px] font-normal mb-2 sm:mb-3 md:mb-3 tracking-tight leading-none">
              10%
            </h3>
            <p className="text-sm sm:text-base md:text-[15.5px] font-sans font-normal opacity-95 leading-snug">
              more sebum production takes place for every 1°C rise in the skin temperature.
            </p>
          </div>
          <p className="text-[11px] sm:text-xs md:text-[12.5px] font-sans text-[#E8DCC8]/90 text-right mt-4 sm:mt-6 md:mt-6 font-normal">
            British Journal of Dermatology, 1970
          </p>
        </div>

        {/* CARD 2 */}
        <div className="w-full min-h-0 sm:min-h-[310px] md:min-h-[360px] bg-black/25 backdrop-blur-md border border-white/10 rounded-none p-5 sm:p-6 md:p-6 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all">
          <div>
            <h3 className="font-editorial text-4xl sm:text-5xl md:text-[58px] font-normal mb-2 sm:mb-3 md:mb-3 tracking-tight leading-none">
              2 hrs
            </h3>
            <p className="text-sm sm:text-base md:text-[15.5px] font-sans font-normal opacity-95 leading-snug">
              at 32°C is enough to measurably raise both sebum and inflammation markers in the skin.
            </p>
          </div>
          <p className="text-[11px] sm:text-xs md:text-[12.5px] font-sans text-[#E8DCC8]/90 text-right mt-4 sm:mt-6 md:mt-6 font-normal">
            Fudan University, Shanghai<br />
            Environmental Research, 2025
          </p>
        </div>

        {/* CARD 3 */}
        <div className="w-full min-h-0 sm:min-h-[310px] md:min-h-[360px] bg-black/25 backdrop-blur-md border border-white/10 rounded-none p-5 sm:p-6 md:p-6 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all">
          <div>
            <h3 className="font-editorial text-4xl sm:text-5xl md:text-[58px] font-normal mb-2 sm:mb-3 md:mb-3 tracking-tight leading-none">
              20%
            </h3>
            <p className="text-sm sm:text-base md:text-[15.5px] font-sans font-normal opacity-95 leading-snug">
              more pigment spots on the forehead and cheeks, in skin exposed to more traffic particles.
            </p>
          </div>
          <p className="text-[11px] sm:text-xs md:text-[12.5px] font-sans text-[#E8DCC8]/90 text-right mt-4 sm:mt-6 md:mt-6 font-normal">
            Journal of Investigative<br />
            Dermatology, 2010
          </p>
        </div>

      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />


    </section>
  );
}