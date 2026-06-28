import ClientPage from './ClientPage';
import type { Metadata } from 'next';

const siteUrl = 'https://jagmeenfashion.com';
const siteName = 'Jagmeen Fashion';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Men Products Online India - Jagmeen Fashion',
  description:
    'Shop quality Western and Indo-Western clothing for men online at Jagmeen Fashion. Explore latest styles, fair prices and delivery across India.',
  keywords: [
    
    "Men products online India",
    "Men's Clothing India",
    "jagenmen's clothing",
    "Men's Clothing Online India",
    'Men Clothing Online India',
    'Jagmeen',
    'Jagmeen Fashion',
    'Jagmeen Men',
    'Mens Clothing',
    'Men Fashion',
    'Men Fashion Online India',
  ],
  openGraph: {
    type: 'website',
    siteName,
    title: 'Jagmeen Fashion - Mens Clothing Online India',
    description:
      'Discover quality Western and Indo-Western fashion from Jagmeen Fashion, based in Faridabad, Haryana.',
    url: siteUrl,
    images: [{ url: '/jagmeen_logo.png', width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jagmeen Fashion - Mens Clothing Online India',
    description: 'Shop quality Western and Indo-Western clothing online at Jagmeen Fashion.',
    images: ['/jagmeen_logo.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function MenPage({ params }: { params?: { slug?: string } }) {
  const slug = (params?.slug as string) || 'men';
  return <ClientPage slug={slug} />;
}
