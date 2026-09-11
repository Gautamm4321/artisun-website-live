import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sunscreen FAQs – SPF, PA, White Cast & More | Artisun',
  description:
    'Straight answers on SPF, PA++++, white cast, sunscreen for oily and dry skin, and how climate-smart sun care works. Everything you want to know about Artisun.',
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}