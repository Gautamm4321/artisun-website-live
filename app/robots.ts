import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cart',
          '/checkout',
          '/orders/*',
          '/api/*',
          '/*?*preview=*',
        ],
      },
    ],
    sitemap: 'https://artisunskin.com/sitemap.xml',
    host: 'https://artisunskin.com',
  };
}
