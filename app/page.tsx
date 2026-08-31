

// Tell Next.js to always render this page dynamically (on demand)
// This is needed because video data must always be fresh
export const dynamic = 'force-dynamic';

import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import VideoHeroSection from '@/components/sections/VideoHeroSection';
import Footer from '@/components/layout/Footer';
import BestSeller from '@/components/sections/BestSeller';
import Title from '@/components/sections/Title';
import { SITE_NAME, SITE_URL } from '@/lib/seo';
import type { Banner, BannerType } from '@/lib/api';
// import FeaturedProductCard from '@/components/sections/FeaturedProducts';
import DoodleProductCard from '@/components/sections/DoodledProducts';
import DoodleBestSeller from '@/components/sections/DoodleBestSeller';

export const metadata = {
  title: `Jagmeen - Online Fashion Store`,
  description:
    "Jagmeen is a lifestyle brand. Focusing on latest trends in clothing. ",
  keywords: [
    'Jagmeen Fashion',
    'online clothes India',
    'buy women clothing online India',
    'men fashion India',
    'Western wear India',
    'Indo-Western clothing',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} - Jagmeen online fashion store`,
    description:
      "Jagmeen is a lifestyle brand. Focusing on latest trends in clothing. ",
    url: SITE_URL,
    type: 'website',
  },
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.jagmeenfashion.com';


async function getBanners(type: BannerType): Promise<Banner[]> {
  try {
    const response = await fetch(`${apiUrl}/api/banners/type/${type}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    const payload = await response.json();
    const banners = payload?.data?.banners || [];

    return banners.sort((a: Banner, b: Banner) => {
      if (a.is_for_mobile === b.is_for_mobile) return a.id - b.id;
      return a.is_for_mobile ? -1 : 1;
    });
  } catch (error) {
    console.error(`Failed to fetch ${type} banners for homepage:`, error);
    return [];
  }
}

async function getSectionTitle(type: string): Promise<string | null> {
  try {
    const response = await fetch(`${apiUrl}/api/sections/${encodeURIComponent(type)}`, {
      next: { revalidate: 300 },
    });
    console.log(`Fetching section title for ${type}:`, response);
    if (!response.ok) return null;
    const data = await response.json();
    return data?.is_active && typeof data?.title === 'string' ? data.title : null;
  } catch (error) {
    console.error(`Failed to fetch ${type} section title:`, error);
    return null;
  }
}

async function getVideos(): Promise<any[]> {
  try {
    // revalidate: 60 — refresh every 60 seconds, works in dynamic rendering
    const response = await fetch(`${apiUrl}/api/videos/`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) return [];
    const payload = await response.json();
    const allVideos = payload?.data || [];
    return allVideos.filter((v: any) => v.is_active);
  } catch (error) {
    console.error(`Failed to fetch videos for homepage:`, error);
    return [];
  }
}

export default async function Home() {
  const [homeBanners, trendingBanners, bestSellerBanners, trendingTitle, bestSellerTitle, videos] =
    await Promise.all([
      getBanners('HOME'),
      getBanners('TRENDING'),
      getBanners('BESTSELLER'),
      getSectionTitle('TRENDING'),
      getSectionTitle('BESTSELLER'),
      getVideos(),
    ]);

  return (
    <>
      <Header />

      <main className="flex-1 flex flex-col w-full bg-white md:pb-20 overflow-hidden ">
        {/* Video section — shows only if a video is available for this device */}
        <VideoHeroSection videos={videos} />
        {/* Home banner — always visible */}
        <HeroSection bannerType="HOME" initialBanners={homeBanners} />

        <section className="py-5 md:py-8 mt-20 ">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center">
            <h2 className=" font-heading font-bold text-xl md:text-2xl text-primary uppercase ">
              <Title sectionType="TRENDING" fallback="Trending" />
            </h2>
            <div className="w-16 h-0.5 mb-6 bg-white" />
          </div>
          <HeroSection bannerType="TRENDING" initialBanners={trendingBanners} />
        </section>

        <DoodleProductCard />
        {/* <span className='w-full h-1 bg-black'></span> */}
        <section className="py-5 md:py-8 bg-white mt-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center">
            <h2 className=" font-heading font-bold text-xl md:text-2xl text-primary uppercase flex items-center justify-center">
              <Title sectionType="BESTSELLER" fallback="Best Seller" />
            </h2>
            <div className="w-16 h-0.5 mb-6 bg-white" />
          </div>
          <HeroSection bannerType="BESTSELLER" initialBanners={bestSellerBanners} />
        </section>
        <DoodleBestSeller />

      </main>
      <div className="w-full flex items-center justify-center py-4">
        <div className="h-[1px] w-40 sm:w-56 md:w-70 lg:w-96 bg-black" />
      </div>
      <Footer />
    </>
  );
}
