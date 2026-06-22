import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://jagmeenfashion.com'
  
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/api/products/getall?size=1000`);
    const productsRes = await res.json();
    
    if (productsRes.data?.data) {
      productUrls = productsRes.data.data.map((p: any) => ({
        url: `${base}/products/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error("Error generating sitemap products:", error);
  }

  return [
    { url: base, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/women`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/men`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/kids`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/sale`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    ...productUrls,
  ];
}
