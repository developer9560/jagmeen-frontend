import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  SITE_URL,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  type LandingPageSeo,
} from '@/lib/seo';

interface SeoLandingPageProps {
  page: LandingPageSeo;
}

export default function SeoLandingPage({ page }: SeoLandingPageProps) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: page.title, url: `${SITE_URL}/${page.slug}` },
  ]);
  const faqJsonLd = buildFaqJsonLd(page.faqs);

  return (
    <>
      <Header />
      <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
          <nav className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-8">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span className="mx-3">/</span>
            <span className="text-gold">{page.title}</span>
          </nav>

          <div className="max-w-4xl">
            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-5">
              Jagmeen Fashion
            </p>
            <h1 className="font-heading italic text-4xl md:text-6xl leading-tight mb-6">
              {page.h1}
            </h1>
            <p className="text-white/65 text-lg md:text-xl leading-relaxed">
              {page.description}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2">
            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Overview
            </p>
            <div className="space-y-5 text-charcoal/75 leading-relaxed text-base md:text-lg">
              {page.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border border-gray-100 p-5 hover:border-gold hover:bg-cream/40 transition-colors group"
                >
                  <span className="text-sm font-semibold text-primary group-hover:text-gold transition-colors">
                    {link.label}
                  </span>
                  <ArrowRight size={15} className="mt-3 text-gold" />
                </Link>
              ))}
            </div>
          </article>

          <aside className="bg-cream/60 border border-gold/20 p-6 md:p-8 h-fit">
            <h2 className="font-heading italic text-2xl text-primary mb-5">
              What this page covers
            </h2>
            <ul className="space-y-4">
              {page.keywords.map((keyword) => (
                <li key={keyword} className="flex gap-3 text-sm text-charcoal/75">
                  <CheckCircle2 size={17} className="text-gold flex-shrink-0 mt-0.5" />
                  <span>{keyword}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted mt-6 leading-relaxed">
              Update final researched SEO keywords in <span className="font-semibold">frontend/lib/seo.ts</span>.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
              FAQ
            </p>
            <h2 className="font-heading italic text-4xl md:text-5xl text-primary">
              Helpful Questions
            </h2>
          </div>

          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-gray-100 p-6">
                <h3 className="font-semibold text-primary mb-2">{faq.question}</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
