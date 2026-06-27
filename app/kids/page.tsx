import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages.kids;

export const metadata: Metadata = buildPageMetadata(page);

export default function KidsPage() {
  return <SeoLandingPage page={page} />;
}
