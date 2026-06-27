import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: `All Products Online India - ${SITE_NAME}`,
  description:
    'Shop all active Jagmeen Fashion products online. Explore Western and Indo-Western apparel with prices, images, product details and delivery across India.',
  keywords: [
    'Jagmeen Fashion products',
    'online clothes India',
    'Western wear India',
    'Indo-Western clothing',
    'buy clothes online India',
  ],
  alternates: { canonical: `${SITE_URL}/products` },
  openGraph: {
    title: `All Products Online India - ${SITE_NAME}`,
    description: 'Explore all active Jagmeen Fashion products online.',
    url: `${SITE_URL}/products`,
    type: 'website',
    siteName: SITE_NAME,
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
