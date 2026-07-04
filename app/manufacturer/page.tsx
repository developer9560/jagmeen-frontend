import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Heart, Award, Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Jagmeen Fashion - Garments Maufacturer in Faridabad',
  description:
    'Jagmeen Fashion is in the business of manufacturing and export of woven garments. The company is based in India.',
  keywords: [
    'Jagmeen Fashion profile',
    'garment manufacturer Faridabad',
    'clothing manufacturer Haryana',
    'Western wear manufacturer India',
    'Indo-Western apparel manufacturer',
  ],
  alternates: { canonical: 'https://jagmeenfashion.com/profile' },
  openGraph: {
    title: 'Profile - Jagmeen Fashion',
    description:
      'Jagmeen Fashion is in the business of manufacturing and export of woven garments. The company based in India',
    url: 'https://jagmeenfashion.com/profile',
    type: 'website',
  },
};


export default function ManufacturePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fdf8ef_0%,#ffffff_45%,#f7f7f7_100%)] text-slate-800">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_30%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20 sm:px-8 lg:flex-row lg:items-center lg:justify-center lg:gap-14 lg:px-10 lg:py-28">
          <div className="max-w-2xl text-center lg:shrink-0">
           

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to{' '}
              <br></br>
              <span className="text-[#f4c95d]">Jagmeen Fashion !</span>
            </h1>

            <p className="mt-6 text-sm">
              Jagmeen Fashion was established in September 2024 under the leadership of Miss Pawas Sri Pandav, a qualified fashion design she is alumnus of NIFT. With a dynamic vision,wide expertise and knowledge of garments Industry.
            </p>

            <p className="mt-4 text-sm">
              At Jagmeen Fashion, we are committed to pushing the boundries of style and innovation. We seek to empower individuals through high-quality, sustainable fashion that respects our planet and these who inhabit it.
            </p>

            <p className="mt-4 text-sm ">
              Jagmeen Fashion is launched its own e-commerce brand  
              <span className="font-bold"> "Jagmeen" </span> in 2026 it is a fashion & lifestyle brand in India.
            </p>
                <p className="mt-4 text-sm">
              Jagmeen is worked in Woven Fabrics. Its categories are Womens, Mens and Kids wear.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f4c95d] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#e8bc4d]"
              >
                Explore Our Craft
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Discover Our Values
              </Link>
            </div>
          </div>

        
        </div>
      </section>
    </main>
  );
}
