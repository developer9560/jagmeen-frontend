import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages['t-shirts'];

export const metadata: Metadata = buildPageMetadata(page);

export default function TShirtsPage() {
  return <SeoLandingPage page={page} />;
}
