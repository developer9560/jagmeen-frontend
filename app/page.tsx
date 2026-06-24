import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Footer from '@/components/layout/Footer';
import BestSeller from '@/components/sections/BestSeller';

export const metadata = {
  title: 'Jagmeen Fashion — Trendy Clothes for Women & Men Online India',
  description: "Welcome to Jagmeen Fashion — India's favourite online clothing store. Shop women's kurtas, dresses, men's shirts, jeans & more at best prices. Free delivery.",
  alternates: { canonical: 'https://jagmeenfashion.com' },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full overflow-hidden">

        {/* ── Hero Slider: HOME banners ── */}
        <HeroSection bannerType="HOME" />

        {/* ── Trending Products Section ── */}
        <section className="py-6 md:py-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading italic text-4xl md:text-5xl text-primary mb-2">
              Trending Products
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-6" />
          </div>
          {/* TRENDING banner slider sits just above the product grid */}
          <HeroSection bannerType="TRENDING" />
        </section>

        {/* ── Featured / Trending Products Grid ── */}
       

        {/* ── Best Sellers Section ── */}
        <section className="py-6 md:py-10 bg-cream/40">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="font-heading italic text-4xl md:text-5xl text-primary mb-2">
              Best Sellers
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-6" />
          </div>
          {/* BESTSELLER banner slider sits just above the product grid */}
          <HeroSection bannerType="BESTSELLER" />
        </section>

        {/* ── Best Seller Products Grid ── */}
         <FeaturedProducts />
        <BestSeller />

      </main>
      <Footer />
    </>
  );
}
