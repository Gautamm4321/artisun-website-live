'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// useLayoutEffect warns during SSR; this runs it only in the browser.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Animated stat number.
 *
 * The FINAL value is what renders on the server and in the initial HTML, so
 * Google, AI crawlers and no-JS visitors always read the real number
 * (e.g. "98%", never "0%").
 *
 * In the browser, if the number starts off-screen, it is reset to 0 before
 * the first paint (so nobody sees the swap) and counts up to `end` once
 * `play` becomes true. If the number is already on screen at load, or the
 * visitor prefers reduced motion, it simply stays at the final value.
 * If `play` somehow never fires, the number stays correct because the reset
 * only happens off-screen and is undone the moment the counter animates.
 *
 * All instances fed the same `play` flag start and finish together.
 */
export default function CountUp({
  end,
  suffix = '',
  duration = 2,
  play,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  play: boolean;
}) {
  const [value, setValue] = useState(end);
  const spanRef = useRef<HTMLSpanElement>(null);
  const armed = useRef(false); // reset to 0 and waiting to animate
  const done = useRef(false);

  // Before first paint: arm the animation only if the counter is off-screen.
  useIsoLayoutEffect(() => {
    if (end === 0 || play) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = spanRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const offScreen =
      r.bottom <= 0 || r.top >= window.innerHeight || r.right <= 0 || r.left >= window.innerWidth;
    if (offScreen) {
      armed.current = true;
      setValue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!play || done.current) return;
    done.current = true;
    if (!armed.current) {
      setValue(end);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(t >= 1 ? end : Math.round(eased * end));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      done.current = false; // lets a re-run (e.g. React dev double-effect) restart cleanly
    };
  }, [play, end, duration]);

  // Single text node, e.g. "72 hrs", so the HTML reads cleanly.
  return <span ref={spanRef}>{`${value}${suffix}`}</span>;
}
