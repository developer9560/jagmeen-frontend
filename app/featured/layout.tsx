import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Featured Products Online India - ${SITE_NAME}`,
  description:
    'Shop featured Jagmeen Fashion products online. Explore selected Western and Indo-Western styles with delivery across India.',
  keywords: ['featured products Jagmeen Fashion', 'trending clothes India', 'featured fashion online India'],
  alternates: { canonical: `${SITE_URL}/featured` },
  openGraph: {
    title: `Featured Products Online India - ${SITE_NAME}`,
    description: 'Explore selected Jagmeen Fashion styles online.',
    url: `${SITE_URL}/featured`,
    type: 'website',
  },
};

export default function FeaturedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
