import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages.kurtas;

export const metadata: Metadata = buildPageMetadata(page);

export default function KurtasPage() {
  return <SeoLandingPage page={page} />;
}
