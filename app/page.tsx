import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import Footer from '@/components/layout/Footer';
import BestSeller from '@/components/sections/BestSeller';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

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

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full md:pb-20 overflow-hidden">
        <HeroSection bannerType="HOME" />

        <section className="py-5 md:py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-2">
              Trending Products
            </h2>
            <div className="w-16 h-0.5 mb-6" />
          </div>
          <HeroSection bannerType="TRENDING" />
        </section>

        <section className="py-5 md:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-2">
              Best Sellers
            </h2>
            <div className="w-16 h-0.5 mb-6" />
          </div>
          <HeroSection bannerType="BESTSELLER" />
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
