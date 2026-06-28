import type { MetadataRoute } from 'next';
import { SITE_URL, landingPages } from '@/lib/seo';

interface ProductSitemapItem {
  slug: string;
}

interface CategorySitemapItem {
  slug: string;
  is_active?: boolean;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.jagmeenfashion.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productUrls: MetadataRoute.Sitemap = [];
  let categoryUrls: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${apiUrl}/api/products/getall?size=1000`, {
      next: { revalidate: 3600 },
    });
    const productsRes = await res.json();

    const products: ProductSitemapItem[] = productsRes.data?.data || [];
    productUrls = products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error generating sitemap products:', error);
  }

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
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.75,
      }));
  } catch (error) {
    console.error('Error generating sitemap categories:', error);
  }

  const landingUrls: MetadataRoute.Sitemap = Object.values(landingPages).map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page.slug.includes('manufacturer') ? 0.7 : 0.85,
  }));

  return [
    { url: SITE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/featured`, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${SITE_URL}/best-sellers`, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${SITE_URL}/category`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/men`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/women`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/kids`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    ...landingUrls,
    ...categoryUrls,
    ...productUrls,
  ];
}
