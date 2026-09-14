import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Artisun',
  description: 'Transparent shipping timelines and hassle-free return guidelines for Artisun climate-smart sunwear orders across all Indian pin codes.',
  alternates: {
    canonical: '/shipping-returns',
  },
};

export default function ShippingReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
