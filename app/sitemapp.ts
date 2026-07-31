import type { MetadataRoute } from 'next';
import { SITE_URL, landingPages } from '@/lib/seo';

export default async function sitemapp(): Promise<MetadataRoute.Sitemap> {
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

  const landingUrls: MetadataRoute.Sitemap = Object.values(landingPages).map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: page.slug.includes('manufacturer') ? 0.75 : 0.86,
  }));

  return [
    ...staticUrls,
    ...landingUrls,
  ];
}
