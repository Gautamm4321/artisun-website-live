'use client';

import { useEffect } from 'react';

/**
 * MobileScrollFrame — iOS 26 Safari chrome fix.
 *
 * iOS 26 Safari renders any document content that scrolls past the viewport
 * edges behind its translucent status bar (top) and floating tab bar
 * (bottom), while position:fixed elements are clipped to the viewport — so
 * covers can't hide it. The reliable fix (and what the Origin page already
 * does) is to stop the document from scrolling and scroll a fixed,
 * viewport-sized child container instead: nothing ever scrolls "past" the
 * viewport, so those zones show the dark <html> canvas — the clean black
 * strips the home page gets by accident.
 *
 * Mobile (<1024px): <html>/<body> are locked while this is mounted and this
 * frame becomes the page's scroll container (position:fixed, height:100svh,
 * overflow-y:auto — see globals.css).
 *
 * Desktop (≥1024px): renders as a plain in-flow <div>; window scrolling,
 * Lenis and ScrollTrigger behave exactly as before.
 *
 * Keep truly fixed UI (headers, sticky cart bars, progress bars, cursors)
 * OUTSIDE the frame; put everything that scrolls (sections + footer) inside.
 */
export default function MobileScrollFrame({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    document.documentElement.classList.add('has-scroll-frame');
    return () => document.documentElement.classList.remove('has-scroll-frame');
  }, []);

  return (
    <div data-scroll-frame="" className={className}>
      {children}
    </div>
  );
}
