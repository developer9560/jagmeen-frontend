import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages['bulk-clothing-manufacturer'];

export const metadata: Metadata = buildPageMetadata(page);

export default function BulkClothingManufacturerPage() {
  return <SeoLandingPage page={page} />;
}
