import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Origin or Aura — Which Artisun Sunscreen Is Right for You?',
  description:
    "Origin or Aura? Compare Artisun's two sunscreens side by side — SPF, finish, texture and who each is for — and find your fit.",
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'Origin or Aura — Which Artisun Sunscreen Is Right for You?',
    description:
      "Origin or Aura? Compare Artisun's two sunscreens side by side — SPF, finish, texture and who each is for — and find your fit.",
    url: 'https://artisunskin.com/compare',
    siteName: 'Artisun',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}