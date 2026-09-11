import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Origin or Aura – Which Artisun Sunscreen Is Right for You?',
  description:
    "Origin or Aura? Compare Artisun's two sunscreens side by side — SPF, finish, texture and who each is for — and find your fit.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}