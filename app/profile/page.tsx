import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import PdfSlider from '@/components/ui/PdfSlider';

export const metadata: Metadata = {
  title: 'Jagmeen Fashion - Profile',
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

// Use the local PDF from /public folder
const PDF_URL = '/jagmeen_company_profile.pdf';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fdf8ef_0%,#ffffff_45%,#f7f7f7_100%)] text-slate-800">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,201,93,0.28),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_30%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20 sm:px-8 lg:flex-row lg:items-center lg:justify-center lg:gap-14 lg:px-10 lg:py-28">
          <div className="max-w-2xl text-center lg:shrink-0">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to{' '}
              <br />
              <span className="text-red-500">Jagmeen Fashion !</span>
            </h1>

            <p className="mt-6 text-sm">
              Jagmeen Fashion was established in September 2024 under the leadership of Miss Pawas Sri Pandav, a qualified fashion design she is alumnus of NIFT. With a dynamic vision, wide expertise and knowledge of garments Industry.
            </p>

            <p className="mt-4 text-sm">
              At Jagmeen Fashion, we are committed to pushing the boundaries of style and innovation. We seek to empower individuals through high-quality, sustainable fashion that respects our planet and those who inhabit it.
            </p>

            <p className="mt-4 text-sm">
              Jagmeen Fashion is launched its own e-commerce brand{' '}
              <span className="font-bold">&quot;Jagmeen&quot;</span> in 2026 it is a fashion &amp; lifestyle brand in India.
            </p>

            <p className="mt-4 text-sm">
              Jagmeen is worked in Woven Fabrics. Its categories are Womens, Mens and Kids wear.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-red-600"
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

      {/* ── Company Profile Document ── */}
      <section className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section heading */}
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600 mb-2">
              Company Documents
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              Our Company Profile
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-500">
              Browse through our company profile below.
            </p>
          </div>

          {/* PDF rendered as vertical image gallery */}
          <div
            className="w-full bg-white shadow-xl overflow-hidden"
            style={{ userSelect: 'none', WebkitUserSelect: 'none' } as React.CSSProperties}
          >
            <PdfSlider pdfUrl={PDF_URL} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
