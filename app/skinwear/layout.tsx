import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Skinwear | Artisun',
  description: 'Skinwear — a scroll-driven cinematic portrait experience.',
};

export default function SkinwhereLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}