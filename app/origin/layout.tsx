import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Origin 4-in-1 Milk Sunscreen SPF 50+ PA++++ | Artisun',
  description:
    'A 4-in-1 milk sunscreen — serum, moisturiser, SPF 50+ PA++++ and primer in one light layer. No white cast, great for oily skin. Built for Indian weather.',
};

export default function OriginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}