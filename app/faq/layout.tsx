import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Sunscreen FAQs — SPF, PA, White Cast & More | Artisun',
  description:
    'Straight answers on SPF, PA++++, white cast, sunscreen for oily and dry skin, and how climate-smart sun care works. Everything you want to know about Artisun.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Sunscreen FAQs — SPF, PA, White Cast & More | Artisun',
    description:
      'Straight answers on SPF, PA++++, white cast, sunscreen for oily and dry skin, and how climate-smart sun care works. Everything you want to know about Artisun.',
    url: 'https://artisunskin.com/faq',
    siteName: 'Artisun',
    locale: 'en_IN',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Artisun leave a white cast on Indian skin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Both Origin and Aura are formulated specifically for Indian skin tones. They absorb seamlessly and completely invisibly without any purple, chalky, or white residue.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Climate-Smart sunscreen mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Climate-Smart sun care is engineered for Indian weather conditions—monsoon humidity, high heat, and urban pollution. The breathable formulas adapt to environmental shifts rather than melting, feeling sticky, or clogging pores.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which sunscreen should I choose: Origin or Aura?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Origin (SPF 50+ PA++++) is a 4-in-1 lightweight fluid milk with a natural matte finish, best for oily, combination, or active skin in humid heat. Aura (SPF 40 PA++++) is an encapsulated pearl sunscreen delivering a dewy, luminous finish ideal for normal to dry skin and indoor/urban settings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Artisun sunscreen replace my moisturiser and primer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Origin functions as a 4-in-1 formula: antioxidant serum, lightweight moisturiser, broad-spectrum SPF 50+ sunscreen, and makeup-gripping primer in a single fluid layer.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does PA++++ mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PA measures protection against UVA rays (which cause premature skin aging, hyperpigmentation, and deep cellular damage). PA++++ is the highest rating available under international standards, ensuring maximum UVA protection.',
      },
    },
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd schema={faqSchema} />
      {children}
    </>
  );
}