import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Skinwear – Sun Protection, Reimagined | Artisun',
  description:
    'Skinwear is sun care you wear, not tolerate. A new way to think about protection – chosen with intent, worn every day. Discover the idea behind Artisun.',
};

export default function SkinwhereLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}