import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import CategoryStrip from '@/components/sections/CategoryStrip';
import TrendingProducts from '@/components/sections/TrendingProducts';
import SaleBanner from '@/components/sections/SaleBanner';
import CategoryOffers from '@/components/sections/CategoryOffers';
import BrandStrip from '@/components/sections/BrandStrip';
import NewArrivals from '@/components/sections/NewArrivals';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Footer from '@/components/layout/Footer';
import BestSeller from '@/components/sections/BestSeller';

export const metadata = {
  title: 'Jagmeen Fashion — Trendy Clothes for Women & Men Online India',
  description: 'Welcome to Jagmeen Fashion — India\'s favourite online clothing store. Shop women\'s kurtas, dresses, men\'s shirts, jeans & more at best prices. Free delivery.',
  alternates: { canonical: 'https://jagmeenfashion.com' },
};
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full overflow-hidden mt-2 md:mt-3 ">
        <HeroSection />
        {/* <CategoryStrip /> */}
        <FeaturedProducts />
         <BestSeller />
        {/* <BrandStrip />
        <TrendingProducts />
        <SaleBanner />
        <CategoryOffers />
        <BrandStrip />
       
        <NewArrivals /> */}
      </main>
      <Footer />
    </>
  );
}
