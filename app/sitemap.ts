import type { MetadataRoute } from 'next';
import { SITE_URL, landingPages } from '@/lib/seo';

interface ProductSitemapItem {
  slug: string;
  updated_at?: string;
  created_at?: string;
}

interface CategorySitemapItem {
  slug: string;
  is_active?: boolean;
  updated_at?: string;
  created_at?: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.jagmeenfashion.com';

function routeDate(value?: string | null): string {
  return new Date(value || new Date()).toISOString();
}

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
      url: `${SITE_URL}/category`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.85,
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
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const landingUrls: MetadataRoute.Sitemap = Object.values(landingPages).map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: page.slug.includes('manufacturer') ? 0.75 : 0.86,
  }));

  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${apiUrl}/api/products/getall?size=1000`, {
      next: { revalidate: 3600 },
    });
    const productsRes = await res.json();
    const products: ProductSitemapItem[] = productsRes.data?.data || [];

    productUrls = products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: routeDate(product.updated_at || product.created_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error generating sitemap products:', error);
  }

  let categoryUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${apiUrl}/api/categories/list`, {
      next: { revalidate: 3600 },
    });
    const categoriesRes = await res.json();
    const categories: CategorySitemapItem[] = categoriesRes.data?.categories || [];

    categoryUrls = categories
      .filter((category) => category.is_active !== false)
      .map((category) => ({
        url: `${SITE_URL}/category/${category.slug}`,
        lastModified: routeDate(category.updated_at || category.created_at),
        changeFrequency: 'weekly',
        priority: 0.78,
      }));
  } catch (error) {
    console.error('Error generating sitemap categories:', error);
  }

  return [
    ...staticUrls,
    ...landingUrls,
    ...categoryUrls,
    ...productUrls,
  ];
}
