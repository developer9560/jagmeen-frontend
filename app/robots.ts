import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/cart', '/account', '/checkout'],
    },
    sitemap: 'https://jagmeenfashion.com/sitemap.xml',
  }
}
