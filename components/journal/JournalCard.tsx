import Link from 'next/link';
import { cardFlavor, shortDate, truncate, type JournalCard as Card } from '@/lib/journal-shared';

import SizedImg from '@/components/media/SizedImg';
export default function JournalCard({ card }: { card: Card }) {
  return (
    <Link className="j-card" href={`/blog/${card.handle}`}>
      <div className={`field ${cardFlavor(card.tags)}`}>
        {card.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <SizedImg
            src={card.image.url}
            alt={card.image.altText || card.title}
            loading="lazy"
            width={800}
            height={800}
          />
        )}
        <div className="tag">{card.tags[0] || 'Journal'}</div>
        <h3>{card.title}</h3>
        {card.excerpt && <div className="excerpt">{truncate(card.excerpt, 90)}</div>}
        <div className="meta">
          {shortDate(card.publishedAt)} · {card.minutes} min
        </div>
      </div>
    </Link>
  );
}
