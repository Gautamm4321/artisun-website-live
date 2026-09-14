import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Skinwear — Sun Protection, Reimagined | Artisun',
  description:
    'Skinwear is sun care you wear, not tolerate. A new way to think about protection — chosen with intent, worn every day. Discover the idea behind Artisun.',
  alternates: {
    canonical: '/skinwear',
  },
  openGraph: {
    title: 'Skinwear — Sun Protection, Reimagined | Artisun',
    description:
      'Skinwear is sun care you wear, not tolerate. A new way to think about protection — chosen with intent, worn every day. Discover the idea behind Artisun.',
    url: 'https://artisunskin.com/skinwear',
    siteName: 'Artisun',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function SkinwearLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}