import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages.shirts;

export const metadata: Metadata = buildPageMetadata(page);

export default function ShirtsPage() {
  return <SeoLandingPage page={page} />;
}
