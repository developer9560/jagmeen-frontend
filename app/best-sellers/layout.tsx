import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Best Sellers Online India - ${SITE_NAME}`,
  description:
    'Shop best-selling Jagmeen Fashion products online. Explore popular Western and Indo-Western apparel with delivery across India.',
  keywords: ['best sellers Jagmeen Fashion', 'popular clothes online India', 'best fashion products India'],
  alternates: { canonical: `${SITE_URL}/best-sellers` },
  openGraph: {
    title: `Best Sellers Online India - ${SITE_NAME}`,
    description: 'Explore popular Jagmeen Fashion products online.',
    url: `${SITE_URL}/best-sellers`,
    type: 'website',
  },
};

export default function BestSellersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
