import type { Metadata } from 'next';
import {
  SITE_NAME,
  SITE_URL,
  buildBreadcrumbJsonLd,
  truncateText,
} from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

interface ProductImageMeta {
  image_url: string;
  is_primary?: boolean;
}

interface ProductMeta {
  id: number;
  slug: string;
  name: string;
  price: number;
  mrp: number;
  summary?: string | null;
  keywords?: string[];
  images?: ProductImageMeta[];
  updated_at?: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.jagmeenfashion.com';

async function getProduct(slug: string): Promise<ProductMeta | null> {
  try {
    const res = await fetch(`${apiUrl}/api/products/get/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const payload = await res.json();
    return payload?.data || null;
  } catch (error) {
    console.error('Error fetching product SEO data:', error);
    return null;
  }
}

function getPrimaryImage(product: ProductMeta) {
  return (
    product.images?.find((image) => image.is_primary)?.image_url ||
    product.images?.[0]?.image_url ||
    `${SITE_URL}/jagmeen_logo.png`
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'This Jagmeen Fashion product is currently unavailable.',
      robots: { index: false, follow: true },
    };
  }

  const image = getPrimaryImage(product);
  const description = truncateText(
    `Buy ${product.name} online at Jagmeen Fashion for INR ${product.price}. ${product.summary || 'Explore product details, images, stock and delivery information.'}`,
    155
  );

  return {
    title: `Buy ${product.name} Online at INR ${product.price}`,
    description,
    keywords: product.keywords?.length
      ? product.keywords
      : [product.name, `${product.name} price`, `${product.name} Jagmeen Fashion`],
    alternates: { canonical: `${SITE_URL}/products/${slug}` },
    openGraph: {
      title: `Buy ${product.name} Online | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/products/${slug}`,
      type: 'website',
      siteName: SITE_NAME,
      images: [{ url: image, width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Buy ${product.name} Online | ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}

export default async function ProductLayout({ children, params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  const jsonLd = product
    ? [
        {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.name,
          sku: String(product.id),
          image: [getPrimaryImage(product)],
          description: product.summary || product.name,
          brand: {
            '@type': 'Brand',
            name: SITE_NAME,
          },
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}/products/${slug}`,
            priceCurrency: 'INR',
            price: product.price,
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
          },
        },
        buildBreadcrumbJsonLd([
          { name: 'Home', url: SITE_URL },
          { name: 'Products', url: `${SITE_URL}/products` },
          { name: product.name, url: `${SITE_URL}/products/${slug}` },
        ]),
      ]
    : [];

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
