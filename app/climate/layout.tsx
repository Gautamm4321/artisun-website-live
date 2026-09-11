import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Climate-Smart Sunscreen — Built for Indian Weather | Artisun',
  description:
    'Your skin changes with the weather, so your sunscreen should too. See how climate-smart sun care protects through Indian heat, humidity and pollution.',
};

export default function ClimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}