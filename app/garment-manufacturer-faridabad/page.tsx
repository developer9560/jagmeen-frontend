import type { Metadata } from 'next';
import SeoLandingPage from '@/components/seo/SeoLandingPage';
import { buildPageMetadata, landingPages } from '@/lib/seo';

const page = landingPages['garment-manufacturer-faridabad'];

export const metadata: Metadata = buildPageMetadata(page);

export default function GarmentManufacturerFaridabadPage() {
  return <SeoLandingPage page={page} />;
}
