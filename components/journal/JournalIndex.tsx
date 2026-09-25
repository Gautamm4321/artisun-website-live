'use client';

import { useEffect, useMemo, useState } from 'react';
import { asset } from '@/lib/asset';
import { PILLARS, type JournalCard as Card } from '@/lib/journal-shared';
import JournalCard from './JournalCard';

import SizedImg from '@/components/media/SizedImg';
const toKey = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/**
 * The Journal index: masthead, pillar filters and the card grid.
 * Filtering happens in the browser (the whole list is already on the page),
 * and the active pillar is mirrored into ?tag= so a filtered view can be
 * shared or bookmarked — e.g. /blog?tag=wear-feel.
 */
export default function JournalIndex({ cards }: { cards: Card[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('tag');
    const match = PILLARS.find((p) => toKey(p) === fromUrl);
    if (match) setActive(match);
  }, []);

  const select = (pillar: string | null) => {
    setActive(pillar);
    const url = new URL(window.location.href);
    if (pillar) url.searchParams.set('tag', toKey(pillar));
    else url.searchParams.delete('tag');
    window.history.replaceState(null, '', url);
  };

  const visible = useMemo(
    () => (active ? cards.filter((c) => c.tags.some((t) => toKey(t) === toKey(active))) : cards),
    [cards, active],
  );

  return (
    <div className="journal">
      <div className="j-grid-wrap">
        <header className="j-header">
          <div className="j-header-eyebrow">The Skinwear Journal</div>
          <h1 className="j-header-title">
            <span className="accent">Artifacts</span>
            <span className="by">
              <span className="by-label">by</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <SizedImg src={asset('/journal/artisun-wordmark.svg')} alt="Artisun" className="j-header-logo-mark" />
            </span>
            {/* Text for search engines and screen readers; the visible heading is unchanged. */}
            <span className="sr-only">: The Sun Care Journal</span>
          </h1>
          <p className="j-header-sub">
            Field notes on weather, wear, and the science of sunscreen that actually holds up.
          </p>
        </header>

        <nav className="j-filters" aria-label="Filter by pillar">
          <button type="button" className={active ? '' : 'is-active'} aria-pressed={!active} onClick={() => select(null)}>
            All
          </button>
          {PILLARS.map((p) => (
            <button
              key={p}
              type="button"
              className={active === p ? 'is-active' : ''}
              aria-pressed={active === p}
              onClick={() => select(p)}
            >
              {p}
            </button>
          ))}
        </nav>

        {visible.length > 0 ? (
          <div className="j-grid">
            {visible.map((card) => (
              <JournalCard key={card.handle} card={card} />
            ))}
          </div>
        ) : cards.length > 0 ? (
          <div className="j-empty">
            Nothing filed under {active} yet.{' '}
            <button type="button" onClick={() => select(null)}>Show all Artifacts</button>
          </div>
        ) : (
          <div className="j-empty">New Artifacts are on the way. Check back soon.</div>
        )}
      </div>
    </div>
  );
}
