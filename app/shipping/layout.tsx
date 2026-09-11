import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Artisun',
  description: 'Shipping, delivery timelines, and returns policy for Artisun orders across India.',
};

export default function ShippingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}