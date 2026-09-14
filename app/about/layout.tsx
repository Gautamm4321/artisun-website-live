import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Artisun — Sun Care Made Properly, for India',
  description:
    "The story behind Artisun — why we made climate-smart sun care built for Indian weather and skin, by people who couldn't find one worth wearing.",
  openGraph: {
    title: 'About Artisun — Sun Care Made Properly, for India',
    description:
      "The story behind Artisun — why we made climate-smart sun care built for Indian weather and skin, by people who couldn't find one worth wearing.",
    url: 'https://artisunskin.com/about',
    type: 'website',
    siteName: 'Artisun',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Artisun — Sun Care Made Properly, for India',
    description:
      "The story behind Artisun — why we made climate-smart sun care built for Indian weather and skin, by people who couldn't find one worth wearing.",
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
