import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Artisun',
  description: 'Understand how Artisun collects, safeguards, and respects your personal data under Indian DPDP and global privacy guidelines.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
