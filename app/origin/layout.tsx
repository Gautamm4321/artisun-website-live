import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Origin 4-in-1 Milk Sunscreen SPF 50+ PA++++ | Artisun',
  description:
    'A 4-in-1 milk sunscreen — serum, moisturiser, SPF 50+ PA++++ and primer in one light layer. No white cast, great for oily skin. Built for Indian weather.',
  alternates: {
    canonical: '/origin',
  },
  openGraph: {
    title: 'Origin 4-in-1 Milk Sunscreen SPF 50+ PA++++ | Artisun',
    description:
      'A 4-in-1 milk sunscreen — serum, moisturiser, SPF 50+ PA++++ and primer in one light layer. Built for Indian weather.',
    url: 'https://artisunskin.com/origin',
    siteName: 'Artisun',
    images: [
      {
        url: 'https://artisunskin.com/products/origin-square.webp',
        width: 800,
        height: 800,
        alt: 'Origin 4-in-1 Milk Sunscreen SPF 50+ PA++++',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Origin 4-in-1 Milk Sunscreen SPF 50+ PA++++',
  image: ['https://artisunskin.com/products/origin-square.webp'],
  description:
    'A 4-in-1 milk sunscreen — serum, moisturiser, SPF 50+ PA++++ and primer in one light layer. No white cast, great for oily skin. Built for Indian weather.',
  sku: 'ART-ORIGIN-50',
  mpn: 'ART-ORIGIN',
  brand: {
    '@type': 'Brand',
    name: 'Artisun',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://artisunskin.com/origin',
    priceCurrency: 'INR',
    price: '1299',
    priceValidUntil: '2027-12-31',
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://artisunskin.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Products',
      item: 'https://artisunskin.com/collection',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Origin',
      item: 'https://artisunskin.com/origin',
    },
  ],
};

export default function OriginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd schema={productSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {children}
    </>
  );
}