import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/layout/Footer';

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

const PDFS = [
  {
    label: 'Company Profile',
    url: 'https://res.cloudinary.com/dofjr7o8l/image/upload/v1783154787/p784uhkrk699geegem80.pdf',
  },
];

export default function ProfilePage({
  searchParams,
}: {
  searchParams?: { pdf?: string };
}) {
  const selectedPdf =
    typeof searchParams?.pdf === 'string' && searchParams.pdf.trim()
      ? searchParams.pdf
      : PDFS[0].url;

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fdf8ef_0%,#ffffff_45%,#f7f7f7_100%)] px-4 py-10 text-slate-800 sm:px-6 lg:px-8">
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
              <span className="font-bold"> &quot;Jagmeen&quot; </span> in 2026 it is a fashion & lifestyle brand in India.
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
      <section className="mx-auto flex flex-col gap-6  border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Company Documents
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            View our profile PDF directly on this page
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Click the document link below to open the PDF inside the viewer without leaving the page.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 ">
          {PDFS.map((pdf) => {
            const isActive = selectedPdf === pdf.url;
            return (
              <Link
                key={pdf.label}
                href={`/profile?pdf=${encodeURIComponent(pdf.url)}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {pdf.label}
              </Link>
            );
          })}
        </div>

        <div className="overflow-hidden  rounded-[1.5rem] border border-slate-200 bg-slate-50">
          <iframe
            src={selectedPdf}
            title="Jagmeen Fashion PDF Viewer"
            className="min-h-[70vh] w-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span>Having trouble viewing the PDF?</span>
          <a
            href={selectedPdf}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-amber-600 underline-offset-4 hover:underline"
          >
            Open in a new tab
          </a>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
