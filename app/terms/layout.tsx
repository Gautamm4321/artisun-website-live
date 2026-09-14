import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Artisun',
  description: 'Terms and conditions governing orders, browsing, and use of Artisun website and climate-smart skinwear products.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
