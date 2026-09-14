import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Sun Care Journal — Indian Weather, Skin & Science | Artisun',
  description:
    'Articles on sun protection for Indian skin, UV index guides for Indian cities, decoding sunscreen ingredients, and the science of climate-smart skincare.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Sun Care Journal — Indian Weather, Skin & Science | Artisun',
    description:
      'Articles on sun protection for Indian skin, UV index guides for Indian cities, decoding sunscreen ingredients, and the science of climate-smart skincare.',
    url: 'https://artisunskin.com/blog',
    siteName: 'Artisun',
    locale: 'en_IN',
    type: 'website',
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Artifacts by Artisun',
  url: 'https://artisunskin.com/blog',
  description: 'Skincare science and climate-smart sun care guides designed for Indian cities and climates.',
  publisher: {
    '@type': 'Organization',
    name: 'Artisun',
    url: 'https://artisunskin.com',
    logo: 'https://artisunskin.com/logo.png',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd schema={blogSchema} />
      {children}
    </>
  );
}
