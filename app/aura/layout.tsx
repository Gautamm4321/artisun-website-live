import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aura Pearl Sunscreen SPF 40 PA++++ | Skinwear by Artisun',
  description:
    'Pearl sunscreen that adjusts to your weather – broad-spectrum SPF 40 with skincare in every pearl. No white cast, a soft dewy finish. Built for Indian skin.',
};

export default function AuraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}