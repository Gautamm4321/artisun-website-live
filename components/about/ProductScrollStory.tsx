'use client';

import { useEffect, useRef, useState } from 'react';
import Image from '@/components/media/SizedImage';
import { motion, useScroll, useTransform, PanInfo, AnimatePresence } from 'framer-motion';
import { asset } from '@/lib/asset';

export type StoryParagraph = { text: string; em?: string };

/* ── Desktop Image Slot Component ── */
function DesktopImageSlot({
  src,
  i,
  productLabel,
  paragraph,
  active,
  setRef,
  flip,
  isDesktop,
}: {
  src: string;
  i: number;
  productLabel: string;
  paragraph?: StoryParagraph;
  active: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  flip?: boolean;
  isDesktop: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0.75]);
  return (
    <div
      data-idx={i}
      ref={(el) => {
        containerRef.current = el;
        setRef(el);
      }}
    >
      <div
        className={`min-h-0 ${i === 0 ? 'md:min-h-[100vh] snap-start pt-4 md:pt-20' : 'md:min-h-[85vh] pt-4 md:pt-8'} flex flex-col pb-6 md:pb-10 items-center ${flip ? 'md:items-start' : 'md:items-end'}`}
      >
        <motion.div
          style={{ scale }}
          className="relative w-full max-w-[440px] h-[45vh] md:h-[65vh] rounded-[24px] overflow-hidden shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/5"
        >
          {isDesktop && (
            <Image
              src={asset(src)}
              alt={`${productLabel} ${i + 1}`}
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
            />
          )}
        </motion.div>

        <div className="mt-4 md:mt-8 w-full max-w-[440px]">
          <div
            className="transition-all duration-700 ease-out"
            style={{ opacity: active ? 1 : 0.35 }}
          >
            <p
              className={`font-suisse text-[var(--brand-cream)] text-[16px] md:text-[21px] lg:text-[24px] leading-[1.35] text-center ${flip ? 'md:text-left' : 'md:text-right'
                }`}
            >
              {paragraph?.text}
            </p>

            {paragraph?.em && (
              <p className="font-suisse text-[var(--brand-cream)] text-[16px] md:text-[21px] lg:text-[24px] leading-[1.35] mt-2 text-center">
                {paragraph.em}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductScrollStory({
  productLabel,
  paragraphs,
  images,
  flip = false,
  eyebrow,
  heading,
}: {
  productLabel: string;
  productSub: string;
  paragraphs: StoryParagraph[];
  images: string[];
  flip?: boolean;
  eyebrow?: string;
  heading?: string[];
}) {
  const [active, setActive] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Pre-warm remaining carousel images in browser cache so mobile swipes are instant
  useEffect(() => {
    if (typeof window !== 'undefined') {
      images.forEach((src) => {
        const img = new window.Image();
        img.src = asset(src);
      });
    }
  }, [images]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { threshold: 0.55 }
    );

    slotRefs.current.forEach((el) => el && io.observe(el));

    return () => io.disconnect();
  }, []);

  const headingLines = heading ?? ['The Artisun', 'Perspective'];

  /* ── Touch / Finger Swipe Logic for Mobile ── */
  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50; // minimum drag pixels to trigger slide
    if (info.offset.x < -swipeThreshold && mobileIndex < images.length - 1) {
      setMobileIndex((prev) => prev + 1); // Swipe Left -> Next Image
    } else if (info.offset.x > swipeThreshold && mobileIndex > 0) {
      setMobileIndex((prev) => prev - 1); // Swipe Right -> Previous Image
    }
  };

  return (
    <section className="relative w-full px-4 md:px-16 lg:px-24">
      {/* ── 1. MOBILE & SMALL TABLET CAROUSEL VIEW WITH TOUCH SWIPE & SCROLL REVEAL (< 768px) ── */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
        className="block md:hidden py-11 sm:py-14 px-2 text-center w-full max-w-[480px] mx-auto overflow-hidden"
      >
        {/* Eyebrow */}
        {eyebrow && (
          <p className="font-suisse uppercase tracking-[0.14em] text-[12px] text-[var(--brand-cream)]/75 mb-2">
            {eyebrow}
          </p>
        )}

        {/* Heading */}
        <h2 className="font-editorial text-[clamp(1.75rem,6.8vw,2.4rem)] leading-[1.15] tracking-[-0.03em] text-[var(--brand-cream)] mb-6">
          {headingLines.map((line, idx) => (
            <span key={idx} className="block">
              {line}
            </span>
          ))}
        </h2>

        {/* Draggable/Swipable Image Container */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative w-full h-[280px] sm:h-[340px] rounded-[18px] overflow-hidden shadow-2xl mb-5 border border-white/10 bg-[#8B3A32] cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {images.map((src, idx) => {
            const isCurrent = mobileIndex === idx;
            const isPrev = idx < mobileIndex;
            return (
              <div
                key={src}
                className={`absolute inset-0 w-full h-full transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${
                  isCurrent
                    ? 'opacity-100 translate-x-0 scale-100 z-10 pointer-events-auto'
                    : isPrev
                    ? 'opacity-0 -translate-x-12 scale-[0.97] z-0 pointer-events-none'
                    : 'opacity-0 translate-x-12 scale-[0.97] z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={asset(src)}
                  alt={`${productLabel} ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 440px"
                  loading="eager"
                  className="object-cover pointer-events-none"
                />
              </div>
            );
          })}
        </motion.div>

        {/* Draggable/Swipable Text Container (Swipes with finger gesture identically to image) */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative min-h-[75px] max-w-[420px] mx-auto flex flex-col justify-center mb-5 overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {paragraphs.map((p, idx) => {
            const isCurrent = mobileIndex === idx;
            const isPrev = idx < mobileIndex;
            return (
              <div
                key={idx}
                className={`transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform ${
                  isCurrent
                    ? 'opacity-100 translate-x-0 pointer-events-auto relative z-10'
                    : isPrev
                    ? 'opacity-0 -translate-x-10 pointer-events-none absolute inset-x-0 top-0 z-0'
                    : 'opacity-0 translate-x-10 pointer-events-none absolute inset-x-0 top-0 z-0'
                }`}
              >
                <p className="font-suisse text-[var(--brand-cream)] text-[14px] sm:text-[15px] leading-[1.45] opacity-95 select-none pointer-events-none">
                  {p?.text}{p?.em ? ` ${p.em}` : ''}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* 3 Pagination Dots */}
        <div className="flex items-center justify-center gap-2.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setMobileIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${mobileIndex === idx
                ? 'w-6 bg-white opacity-100'
                : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
            />
          ))}
        </div>
      </motion.div>

      {/* ── 2. DESKTOP STICKY SCROLL VIEW (>= 768px) ── */}
      <div className="hidden md:grid md:grid-cols-2 relative w-full items-start">
        {/* Editorial title side (desktop sticky pinned to section) */}
        <div
          className={`self-start sticky top-0 h-screen flex items-center ${flip ? 'md:order-2 justify-end text-right' : 'justify-start text-left'
            }`}
        >
          <div>

            {eyebrow && (
              <p className="font-suisse uppercase tracking-[0.12em] text-[22px] md:text-[26px] text-[var(--brand-cream)]/70 mb-3">
                {eyebrow}
              </p>
            )}
            <h2 className="font-editorial text-[clamp(2.2rem,4.5vw,5rem)] leading-[1.18] tracking-[-0.04em] text-[var(--brand-cream)]">
              {headingLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Scrolling product shots */}
        <div className={flip ? 'md:order-1' : ''}>
          {images.map((src, i) => (
            <DesktopImageSlot
              key={src}
              src={src}
              i={i}
              productLabel={productLabel}
              paragraph={paragraphs[i]}
              active={active === i}
              flip={flip}
              isDesktop={isDesktop}
              setRef={(el) => {
                slotRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

    </section >
  );
}