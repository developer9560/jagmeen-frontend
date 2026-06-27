import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages.men;

export const metadata: Metadata = buildPageMetadata(page);

export default function MenPage() {
  return <SeoLandingPage page={page} />;
}
