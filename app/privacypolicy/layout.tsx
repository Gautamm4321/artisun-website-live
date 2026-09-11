import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Artisun',
  description: 'Your data, respected. Read the Artisun privacy policy.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}