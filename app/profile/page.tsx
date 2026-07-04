import type { Metadata } from 'next';
import Link from 'next/link';

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
      <section className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
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

        <div className="flex flex-wrap gap-3">
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

        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
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
    </main>
  );
}
