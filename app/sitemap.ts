import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/trending`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/best-sellers`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    {
      url: `${SITE_URL}/women`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/men`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/kids`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    
  ];

  return [
    ...staticUrls,
  ];
}
