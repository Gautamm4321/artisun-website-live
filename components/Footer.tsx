'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { asset } from '@/lib/asset';

const quickLinks: { label: string; href: string }[] = [
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Artifacts by Artisun', href: '/blog' },
];

const policyLinks: { label: string; href: string }[] = [
  { label: 'Privacy Policy', href: '/privacypolicy' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Refunds & Cancellations', href: '/shipping' },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7.2" cy="7.4" r="1.15" fill="currentColor" />
      <rect x="6.1" y="10.4" width="2.2" height="7.2" fill="currentColor" />
      <path d="M11.3 10.4h2.1v1.05c.55-.75 1.35-1.25 2.55-1.25 1.95 0 3.05 1.3 3.05 3.55v4.85h-2.2v-4.4c0-1.1-.4-1.85-1.4-1.85-.75 0-1.2.5-1.4 1-.07.18-.09.42-.09.67v4.58h-2.2c.03-6.4 0-7.2 0-9.2Z" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 13.8697 2.50518 15.6244 3.38916 17.1348L2.04785 21.5547C1.94437 21.8886 2.23903 22.1974 2.57764 22.1096L7.18066 20.9277C8.6411 21.7048 10.2676 22.125 12.001 22.125C17.5239 22.125 22.001 17.6479 22.001 12.125C22.001 6.60215 17.5239 2 12.001 2ZM12.001 3.875C16.4884 3.875 20.126 7.6376 20.126 12.125C20.126 16.6124 16.4884 20.25 12.001 20.25C10.4177 20.25 8.94192 19.7913 7.69629 19.0039L7.43457 18.8477L4.41504 19.626L5.23438 16.6992L5.05664 16.4248C4.19275 15.1368 3.87598 13.6033 3.87598 12C3.87598 7.51256 7.51358 3.875 12.001 3.875ZM8.70703 7.5C8.52344 7.5 8.23218 7.56836 7.98145 7.83984C7.73047 8.1123 7.00098 8.79297 7.00098 10.1758C7.00098 11.5586 7.98145 12.8965 8.11816 13.082C8.25488 13.2676 10.0273 16.0273 12.7383 17.1875C14.9883 18.1484 15.4512 17.9746 15.9434 17.9277C16.4355 17.8809 17.5469 17.2461 17.7734 16.5859C17.9941 15.9277 17.9941 15.3594 17.9219 15.2402C17.8438 15.125 17.6582 15.0527 17.3848 14.9121C17.1113 14.7715 15.7773 14.0996 15.5273 14.0039C15.2773 13.9082 15.0918 13.8613 14.9063 14.1348C14.7207 14.4082 14.1934 15.0293 14.0313 15.2168C13.875 15.4023 13.7129 15.4258 13.4414 15.2871C13.1699 15.1484 12.2988 14.8594 11.2598 13.9258C10.4531 13.2012 9.90039 12.3105 9.74414 12.0371C9.58789 11.7637 9.74414 11.624 9.87012 11.4707C10.0664 11.2402 10.3066 10.9082 10.4531 10.752C10.5996 10.5957 10.6934 10.457 10.7871 10.2715C10.8809 10.0859 10.8398 9.92773 10.7637 9.78906C10.6934 9.6582 10.1641 8.26758 9.89746 7.66016C9.71387 7.23828 9.50781 7.21289 9.33887 7.20508C9.18262 7.19727 8.99707 7.5 8.70703 7.5Z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const containerRef = useRef<HTMLElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ── ENTRY: Diagonal Wipe — applied to the content wrapper only, never
      // the footer element itself, so the background gradient stays fully
      // painted and flows continuously from CTASection above instead of
      // clipping away to reveal the page's raw background underneath. ──


      // REMOVED clipPath wipe - ye hi footer kaat raha tha


      gsap.fromTo(
        '.footer-reveal',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top bottom', once: true },
        }
      );


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative w-full overflow-visible z-10"
      style={{
        background:
          'linear-gradient(180deg, #56190C 0%, #4C130A 20%, #3D0F09 42%, #2E0B07 64%, #200705 84%, #170402 100%)',
      }}
    >
      {/* Same slow flowing light sweep as CTASection, so the gradient reads
          as one continuous, living surface across both sections. Only on home page. */}
      {isHome && (
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            left: '-10vw',
            width: '120vw',
            background: 'radial-gradient(ellipse at 50% 10%, rgba(255,150,60,0.08), transparent 55%)',
            mixBlendMode: 'screen',
            animation: 'moveLightX 25s ease-in-out infinite reverse',
          }}
        />
      )}

      <div ref={contentWrapRef} className="w-full flex items-center justify-center">
        <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-10 md:pt-12 pb-4 md:pb-5 w-full overflow-visible">
          <div className="flex flex-col md:flex-row md:justify-between gap-14 md:gap-8">

            {/* Quick Links + Policies */}
            <div className="flex gap-16 sm:gap-20 lg:gap-28 footer-reveal">
              <div className="flex flex-col gap-3 md:gap-4">
                <h4 className="font-suisse text-lg md:text-xl lg:text-2xl text-[var(--brand-cream)] font-medium leading-[1.3] overflow-visible pt-1">
                  Quick Links
                </h4>
                {quickLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-suisse text-sm md:text-base lg:text-lg text-[var(--brand-cream)]/90 hover:text-white transition-colors duration-300 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                <h4 className="font-suisse text-lg md:text-xl lg:text-2xl text-[var(--brand-cream)] font-medium leading-[1.3] overflow-visible pt-1">
                  Policies
                </h4>
                {policyLinks.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-suisse text-sm md:text-base lg:text-lg text-[var(--brand-cream)]/90 hover:text-white transition-colors duration-300 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Socials + Newsletter */}
            <div className="flex flex-col items-start md:items-end gap-4 md:gap-5 md:max-w-sm lg:max-w-md footer-reveal">
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/artisunskinwear"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="shrink-0 w-8 h-8 md:w-9 md:h-9 text-[var(--brand-cream)] hover:text-white transition-colors duration-300"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://wa.me/917982605517"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="shrink-0 w-8 h-8 md:w-9 md:h-9 text-[var(--brand-cream)] hover:text-white transition-colors duration-300"
                >
                  <WhatsAppIcon />
                </a>
              </div>

              <p className="font-suisse text-sm md:text-base lg:text-lg text-[var(--brand-cream)]/90 text-left md:text-right leading-snug">
                Be the first to experience new launches, exclusive offers and the future of Skinwear.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  (e.currentTarget.querySelector('input') as HTMLInputElement | null)?.blur();
                }}
                className="w-full sm:w-80 md:w-full lg:w-96"
              >
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter Email"
                  style={{ fontSize: '16px' }}
                  onBlur={() => {
                    // Force iOS Safari to reset any leftover zoom after the
                    // keyboard closes — font-size 16px prevents the initial
                    // zoom, but Safari can still leave the page scaled after blur.
                    const viewport = document.querySelector('meta[name="viewport"]');
                    if (viewport) {
                      const original = viewport.getAttribute('content') || '';
                      viewport.setAttribute('content', `${original}, maximum-scale=1`);
                      setTimeout(() => {
                        viewport.setAttribute('content', original);
                      }, 300);
                    }
                    window.scrollTo({ top: window.scrollY, behavior: 'smooth' });
                  }}
                  className="w-full bg-[var(--brand-cream)] text-[#C02D19] placeholder:text-[#C02D19] rounded-full px-6 py-3 md:py-3.5 text-base font-suisse outline-none touch-manipulation"
                />
              </form>
            </div>
          </div>

          {/* Bottom Copyright Text */}
          <div className="pt-10 md:pt-12 pb-1 text-center footer-reveal">
            <p className="font-suisse text-[11px] md:text-xs text-[var(--brand-cream)]/50 tracking-wider uppercase">
              © Artisun Private Limited 2026
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
