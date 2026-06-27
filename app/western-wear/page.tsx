import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages['western-wear'];

export const metadata: Metadata = buildPageMetadata(page);

export default function WesternWearPage() {
  return <SeoLandingPage page={page} />;
}
