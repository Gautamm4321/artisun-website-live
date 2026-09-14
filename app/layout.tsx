import type { Metadata, Viewport } from "next";
import { ppEditorialNew, suisseIntl } from "./fonts";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import CookieBanner from "@/components/CookieBanner";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://artisunskin.com"),
  title: "Artisun — Climate-Smart Sunscreen for Indian Cities & Weather",
  description: "Sun care built for your weather, not just your skin type. Lightweight, broad-spectrum SPF that's skincare and protection in one. Meet Origin & Aura.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Artisun — Climate-Smart Sunscreen for Indian Cities & Weather",
    description: "Sun care built for your weather, not just your skin type. Lightweight, broad-spectrum SPF that's skincare and protection in one. Meet Origin & Aura.",
    url: "https://artisunskin.com",
    siteName: "Artisun",
    locale: "en_IN",
    type: "website",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#C93B1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Artisun",
  url: "https://artisunskin.com",
  logo: "https://artisunskin.com/logo.png",
  sameAs: [
    "https://instagram.com/artisunskinwear",
    "https://wa.me/917982605517",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-7982605517",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ppEditorialNew.variable} ${suisseIntl.variable}`}>
      <body suppressHydrationWarning>
        <JsonLd schema={organizationSchema} />
        <AnalyticsScripts />
        <CartProvider>
          {children}
          <CartDrawer />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}
