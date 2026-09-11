import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Artisun – Sun Care Made Properly, for India',
  description:
    "The story behind Artisun – why we made climate-smart sun care built for Indian weather and skin, by people who couldn't find one worth wearing.",
  openGraph: {
    title: 'About ARTISUN — An Indian Sun-Care House',
    description:
      'Artisun is an Indian sun-care house built around the sun and the way we live with it. We make Skinwear — wearable layers that protect, hydrate, and move with the day.',
    type: 'website',
    siteName: 'ARTISUN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ARTISUN — An Indian Sun-Care House',
    description:
      'Artisun is an Indian sun-care house built around the sun and the way we live with it. Skinwear for the Indian skin, for the Indian climate.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
