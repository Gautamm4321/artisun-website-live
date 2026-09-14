'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('artisun_cookie_consent');
      if (!saved) {
        // Small delay to prevent layout flicker on initial render
        const timer = setTimeout(() => setMounted(true), 800);
        return () => clearTimeout(timer);
      } else if (saved === 'granted') {
        updateGtagConsent('granted');
      }
    } catch {
      // In case localStorage is blocked by user browser settings
    }
  }, []);

  const updateGtagConsent = (status: 'granted' | 'denied') => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: status,
        ad_storage: status,
        ad_user_data: status,
        ad_personalization: status,
      });
    }
  };

  const handleConsent = (granted: boolean) => {
    const status = granted ? 'granted' : 'denied';
    try {
      localStorage.setItem('artisun_cookie_consent', status);
    } catch {
      // Ignore localStorage errors
    }
    updateGtagConsent(status);
    setMounted(false);
  };

  if (!mounted) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      role="region"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[150] bg-[#1a0c0a]/95 border border-[#edc6a2]/25 backdrop-blur-xl p-5 md:p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-[var(--brand-cream,#f5f0eb)] font-suisse animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-editorial text-lg tracking-tight text-[#ffcbb5]">
          Your Privacy &amp; Choices
        </h3>
        <button
          type="button"
          onClick={() => handleConsent(false)}
          aria-label="Close cookie consent banner"
          className="text-[var(--brand-cream)]/50 hover:text-white transition-colors text-sm p-1"
        >
          ✕
        </button>
      </div>

      <p className="text-xs leading-relaxed text-[var(--brand-cream)]/85 mb-4">
        We use essential cookies to keep your cart and sessions secure. With your permission, we also use privacy-first analytics to understand how our climate-smart formulas serve you. Learn more in our{' '}
        <Link href="/privacy" className="underline text-[#ffcbb5] hover:text-white transition-colors">
          Privacy Policy
        </Link>.
      </p>

      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={() => handleConsent(false)}
          className="text-xs px-4 py-2 rounded-full border border-white/20 text-[var(--brand-cream)]/80 hover:text-white hover:bg-white/10 transition-all font-suisse"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => handleConsent(true)}
          className="text-xs px-5 py-2 rounded-full bg-[#C93B1A] text-white font-medium hover:bg-[#a82e12] transition-all shadow-md shadow-[#C93B1A]/20 font-suisse"
        >
          Accept All
        </button>
      </div>
    </aside>
  );
}
