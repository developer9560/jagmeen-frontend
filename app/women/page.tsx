import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages.women;

export const metadata: Metadata = buildPageMetadata(page);

export default function WomenPage() {
  return <SeoLandingPage page={page} />;
}
