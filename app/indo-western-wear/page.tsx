import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages['indo-western-wear'];

export const metadata: Metadata = buildPageMetadata(page);

export default function IndoWesternWearPage() {
  return <SeoLandingPage page={page} />;
}
