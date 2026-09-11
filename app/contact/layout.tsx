import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Artisun',
  description: "Get in touch with Artisun support team. We're right here.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}