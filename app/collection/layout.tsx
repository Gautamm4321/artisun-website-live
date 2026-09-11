import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Sunscreen for Face & Body | Artisun',
  description:
    "Shop Artisun's climate-smart sunscreens — Origin 4-in-1 and Aura Pearl. Broad-spectrum SPF built for Indian skin and weather. Free first-order shipping.",
};

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}