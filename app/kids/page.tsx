import ClientPage from './ClientPage';
import type { Metadata } from 'next';

const siteUrl = 'https://jagmeenfashion.com';
const siteName = 'Jagmeen Fashion';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Kids Products Online India - Jagmeen Fashion',
  description:
    'Shop quality Western and Indo-Western clothing for kids online at Jagmeen Fashion. Explore latest styles, fair prices and delivery across India.',
  keywords: [
    
    "Kids products online India",
    "Kids' Clothing India",
    "jagenkids' clothing",
    "Kids' Clothing Online India",
    'Kids Clothing Online India',
    'Jagmeen',
    'Jagmeen Fashion',
    'Jagmeen Kids',
    'Kids Clothing',
    'Kids Fashion',
    'Kids Fashion Online India',
  ],
  openGraph: {
    type: 'website',
    siteName,
    title: 'Jagmeen Fashion - Kids Clothing Online India',
    description:
      'Discover quality Western and Indo-Western fashion from Jagmeen Fashion, based in Faridabad, Haryana.',
    url: siteUrl,
    images: [{ url: '/jagmeen_logo.png', width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jagmeen Fashion - Kids Clothing Online India',
    description: 'Shop quality Western and Indo-Western clothing online at Jagmeen Fashion.',
    images: ['/jagmeen_logo.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};


export default function KidsPage({ params }: { params?: { slug?: string } }) {
  const slug = (params?.slug as string) || 'kids';
  return <ClientPage slug={slug} />;
}
