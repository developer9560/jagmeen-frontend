import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import Footer from '@/components/layout/Footer';
import BestSeller from '@/components/sections/BestSeller';
import { SITE_NAME, SITE_URL } from '@/lib/seo';
import type { Banner, BannerType } from '@/lib/api';


export const metadata = {
  title: `${SITE_NAME} - Trendy Clothes for Women & Men Online India`,
  description:
    "Welcome to Jagmeen Fashion, an Indian online clothing store for Western and Indo-Western fashion. Shop men's and women's apparel with delivery across India.",
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
    title: `${SITE_NAME} - Trendy Clothes Online India`,
    description:
      "Shop Western and Indo-Western clothing for men and women at Jagmeen Fashion.",
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
    const response = await fetch(`${apiUrl}/api/sections/${type}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data?.is_active ? data?.title : null;
  } catch (error) {
    console.error(`Failed to fetch ${type} section title:`, error);
    return null;
  }
}
 

export default async function Home() {
  const [homeBanners, trendingBanners, bestSellerBanners, trendingTitle, bestSellerTitle] = await Promise.all([
    getBanners('HOME'),
    getBanners('TRENDING'),
    getBanners('BESTSELLER'),
    getSectionTitle('TRENDING'),
    getSectionTitle('BESTSELLER'),
  ]);

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full md:pb-20 overflow-hidden">
        <HeroSection bannerType="HOME" initialBanners={homeBanners} />

        <section className="py-5 md:py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-2">
              {trendingTitle || 'Trending'}
            </h2>
            <div className="w-16 h-0.5 mb-6 bg-gold" />
          </div>
          <HeroSection bannerType="TRENDING" initialBanners={trendingBanners} />
        </section>

        <section className="py-5 md:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-2">
              {bestSellerTitle || 'Best Seller '}
            </h2>
            <div className="w-16 h-0.5 mb-6 bg-gold" />
          </div>
          <HeroSection bannerType="BESTSELLER" initialBanners={bestSellerBanners} />
        </section>

        <BestSeller />
      </main>
      <div className="w-full flex items-center justify-center py-4">
        <div className="h-[3px] w-40 sm:w-56 md:w-70 lg:w-96 bg-black" />
      </div>
      <Footer />
    </>
  );
}
