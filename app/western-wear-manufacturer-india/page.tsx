import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages['western-wear-manufacturer-india'];

export const metadata: Metadata = buildPageMetadata(page);

export default function WesternWearManufacturerIndiaPage() {
  return <SeoLandingPage page={page} />;
}
