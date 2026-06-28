import ClientPage from './ClientPage';
import type { Metadata } from 'next';

const siteUrl = 'https://jagmeenfashion.com';
const siteName = 'Jagmeen Fashion';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Women Products Online India - Jagmeen Fashion',
  description:
    'Shop quality Western and Indo-Western clothing for women online at Jagmeen Fashion. Explore latest styles, fair prices and delivery across India.',
  keywords: [
    
    "women products online India",
    "Women's Clothing India",
    "jagenwomen's clothing",
    "Women's Clothing Online India",
    'Women Clothing Online India',
    'Jagmeen',
    'Jagmeen Fashion',
    'Jagmeen Women',
    'Womens Clothing',
    'Women Fashion',
    'Women Fashion Online India',
  ],
  openGraph: {
    type: 'website',
    siteName,
    title: 'Jagmeen Fashion - Womens Clothing Online India',
    description:
      'Discover quality Western and Indo-Western fashion from Jagmeen Fashion, based in Faridabad, Haryana.',
    url: siteUrl,
    images: [{ url: '/jagmeen_logo.png', width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jagmeen Fashion - Womens Clothing Online India',
    description: 'Shop quality Western and Indo-Western clothing online at Jagmeen Fashion.',
    images: ['/jagmeen_logo.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};


export default function WomenPage({ params }: { params?: { slug?: string } }) {
  const slug = (params?.slug as string) || 'women';
  return <ClientPage slug={slug} />;
}
