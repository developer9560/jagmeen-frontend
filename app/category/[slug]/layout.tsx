import type { Metadata } from 'next';
import {
  SITE_NAME,
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  getLandingPage,
  titleFromSlug,
  truncateText,
} from '@/lib/seo';

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

interface CategorySeoData {
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  data?: Array<{
    name: string;
    slug: string;
    price: number;
    primary_image?: string | null;
  }>;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.jagmeenfashion.com';

async function getCategoryData(slug: string): Promise<CategorySeoData | null> {
  try {
    const res = await fetch(`${apiUrl}/api/products/category/slug/${slug}?page=1&size=12`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const payload = await res.json();
    return payload?.data || null;
  } catch (error) {
    console.error('Error fetching category SEO data:', error);
    return null;
  }
}

function buildCategoryCopy(slug: string, categoryName: string) {
  const landing = getLandingPage(slug);
  if (landing) {
    return {
      title: landing.metaTitle,
      description: landing.description,
      keywords: landing.keywords,
      faqs: landing.faqs,
    };
  }

  return {
    title: `${categoryName} Online India - Jagmeen Fashion`,
    description: `Shop ${categoryName} online at Jagmeen Fashion. Explore quality apparel, latest styles, fair prices and delivery across India.`,
    keywords: [
      `${categoryName} online India`,
      `buy ${categoryName} India`,
      `${categoryName} Jagmeen Fashion`,
    ],
    faqs: [
      {
        question: `Can I buy ${categoryName} online from Jagmeen Fashion?`,
        answer: `Yes, active ${categoryName} products are listed with images, price and product details.`,
      },
      {
        question: `Does Jagmeen Fashion deliver ${categoryName} across India?`,
        answer: 'Delivery is available across India for eligible products and serviceable pin codes.',
      },
      {
        question: `Where should final ${categoryName} keywords be added?`,
        answer: 'Add researched keywords in the category metadata or the matching entry in frontend/lib/seo.ts.',
      },
    ],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryData = await getCategoryData(slug);
  const categoryName = categoryData?.category?.name || titleFromSlug(slug);
  const copy = buildCategoryCopy(slug, categoryName);

  return {
    title: copy.title,
    description: truncateText(copy.description),
    keywords: copy.keywords,
    alternates: { canonical: `${SITE_URL}/category/${slug}` },
    openGraph: {
      title: copy.title,
      description: truncateText(copy.description),
      url: `${SITE_URL}/category/${slug}`,
      type: 'website',
      siteName: SITE_NAME,
      images: [{ url: '/jagmeen_logo.png', width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: truncateText(copy.description),
      images: ['/jagmeen_logo.png'],
    },
  };
}

export default async function CategoryLayout({ children, params }: Props) {
  const { slug } = await params;
  const categoryData = await getCategoryData(slug);
  const categoryName = categoryData?.category?.name || titleFromSlug(slug);
  const copy = buildCategoryCopy(slug, categoryName);

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: copy.title,
    description: copy.description,
    url: `${SITE_URL}/category/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: (categoryData?.data || []).map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/products/${product.slug}`,
        name: product.name,
      })),
    },
  };

  const schemas = [
    buildBreadcrumbJsonLd([
      { name: 'Home', url: SITE_URL },
      { name: 'Category', url: `${SITE_URL}/products` },
      { name: categoryName, url: `${SITE_URL}/category/${slug}` },
    ]),
    buildFaqJsonLd(copy.faqs),
    itemListJsonLd,
  ];

  return (
    <>
      {schemas.map((schema, index) => (
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
