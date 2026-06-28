"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { productApi } from '@/lib/api';
import type { ProductCardData, CategoryProductsData } from '@/types/product';
import Link from 'next/link';
import { getLandingPage, titleFromSlug } from '@/lib/seo';

type Props = { slug: string };

export default function ClientPage({ slug }: Props) {
  const seoPage = getLandingPage(slug);
  const fallbackTitle = titleFromSlug(slug);

  const [category, setCategory] = useState<{ id: number; name: string; slug: string } | null>(null);
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [pagination, setPagination] = useState<CategoryProductsData['pagination'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'latest'|'price_asc'|'price_desc'|'discount'>('latest');
  const [pageNum, setPageNum] = useState<number>(1);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const res = await productApi.getProductsByCategorySlug(slug, pageNum, 20, minPrice, maxPrice, sortBy);
        const data = res.data as unknown as CategoryProductsData;
        if (cancelled) return;
        setCategory(data.category);
        setProducts(data.data || []);
        setPagination(data.pagination || null);
        setError(null);
      } catch (err: unknown) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchProducts();

    return () => { cancelled = true; };
  }, [slug, pageNum, minPrice, maxPrice, sortBy]);

  return (
    <>
      <Header />
      <main className="flex-1 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-12 flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex items-center justify-between mb-4 bg-white p-4 rounded-sm shadow-sm border border-gray-100">
            <span className="font-semibold text-primary">Filters</span>
            <button className="text-sm text-gold font-bold uppercase tracking-wider">Show Filters</button>
          </div>

          {/* Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0 space-y-8">
            <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100">
              <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">Filter By</h4>

              <div className="mb-8">
                <h5 className="text-sm font-semibold text-primary mb-4">Price Range</h5>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                    <input 
                      type="number" 
                      placeholder="Min" 
                      aria-label="Minimum price"
                      value={minPrice ?? ''} 
                      onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)} 
                      className="w-full pl-7 p-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gold transition-colors" 
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      aria-label="Maximum price"
                      value={maxPrice ?? ''} 
                      onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)} 
                      className="w-full pl-7 p-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gold transition-colors" 
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setPageNum(1)} 
                  className="w-full bg-primary text-white text-xs font-bold uppercase tracking-widest py-3 rounded-sm hover:bg-gold transition-colors"
                >
                  Apply Filter
                </button>
              </div>

              <div className="mb-8">
                <h5 className="text-sm font-semibold text-primary mb-4">Color</h5>
                <div className="flex flex-wrap gap-3">
                  <button className="w-8 h-8 rounded-full bg-slate-800 ring-1 ring-offset-2 ring-transparent hover:ring-slate-800 transition-all cursor-not-allowed opacity-50" title="Black (Coming Soon)"></button>
                  <button className="w-8 h-8 rounded-full bg-rose-600 ring-1 ring-offset-2 ring-transparent hover:ring-rose-600 transition-all cursor-not-allowed opacity-50" title="Red (Coming Soon)"></button>
                  <button className="w-8 h-8 rounded-full bg-emerald-700 ring-1 ring-offset-2 ring-transparent hover:ring-emerald-700 transition-all cursor-not-allowed opacity-50" title="Green (Coming Soon)"></button>
                  <button className="w-8 h-8 rounded-full bg-yellow-400 ring-1 ring-offset-2 ring-transparent hover:ring-yellow-400 transition-all cursor-not-allowed opacity-50" title="Yellow (Coming Soon)"></button>
                  <button className="w-8 h-8 rounded-full bg-blue-600 ring-1 ring-offset-2 ring-transparent hover:ring-blue-600 transition-all cursor-not-allowed opacity-50" title="Blue (Coming Soon)"></button>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-sm font-semibold text-primary mb-4">Size</h5>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button key={size} className="w-10 h-10 border border-gray-200 rounded-sm text-sm text-gray-500 hover:border-gold hover:text-gold transition-colors cursor-not-allowed opacity-50" title={`${size} (Coming Soon)`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-heading italic text-2xl text-primary">{category?.name || seoPage?.h1 || fallbackTitle}</h1>
                <p className="text-sm text-muted">{pagination ? `${pagination.total_records} Products` : ''}</p>
              </div>

              <div className="flex items-center gap-4">
                <label className="text-xs text-muted">Sort By</label>
                <select aria-label="Sort products" value={sortBy} onChange={(e) => { setSortBy(e.target.value as typeof sortBy); setPageNum(1); }} className="p-2 border border-gray-100 rounded">
                  <option value="latest">Latest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="py-20 text-center text-muted">{error}</div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button disabled={pageNum <= 1} onClick={() => setPageNum((s) => Math.max(1, s - 1))} className="px-4 py-2 border rounded">Prev</button>
                  <span className="text-sm">Page {pagination ? pagination.page : pageNum} of {pagination ? pagination.total_pages : 1}</span>
                  <button disabled={pagination ? !pagination.has_next : true} onClick={() => setPageNum((s) => s + 1)} className="px-4 py-2 border rounded">Next</button>
                </div>

                <section className="mt-14 bg-white border border-gray-100 p-6 md:p-8">
                  <h2 className="font-heading italic text-3xl text-primary mb-5">
                    {seoPage?.h1 || `${category?.name || fallbackTitle} at Jagmeen Fashion`}
                  </h2>
                  <div className="space-y-4 text-sm md:text-base text-charcoal/70 leading-relaxed">
                    {seoPage ? (
                      seoPage.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                    ) : (
                      <>
                        <p>
                          Explore {category?.name || fallbackTitle} online at Jagmeen Fashion with product images,
                          prices, availability and clear product details. This category page helps customers compare
                          active products and choose styles that match their need.
                        </p>
                        <p>
                          For stronger SEO, add researched category keywords, useful buying guidance, size notes,
                          fabric details and internal links for every important product group.
                        </p>
                      </>
                    )}
                  </div>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(seoPage?.relatedLinks || [
                      { label: 'All Products', href: '/products' },
                      { label: 'Contact Us', href: '/contact' },
                      { label: 'About Jagmeen', href: '/about' },
                    ]).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="border border-gray-100 px-4 py-3 text-sm font-medium text-primary hover:border-gold hover:text-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="mt-8 bg-cream/60 border border-gold/20 p-6 md:p-8">
                  <h2 className="font-heading italic text-3xl text-primary mb-5">FAQs</h2>
                  <div className="space-y-4">
                    {(seoPage?.faqs || [
                      {
                        question: `Can I buy ${category?.name || fallbackTitle} online from Jagmeen Fashion?`,
                        answer: `Yes, active ${category?.name || fallbackTitle} products are listed with price, images and product details.`,
                      },
                      {
                        question: 'Does Jagmeen Fashion deliver across India?',
                        answer: 'Delivery is available across India for eligible products and serviceable pin codes.',
                      },
                      {
                        question: 'Where should I write researched keywords?',
                        answer: 'Use frontend/lib/seo.ts for landing-page keywords and category/product metadata files for page-specific terms.',
                      },
                    ]).map((faq) => (
                      <div key={faq.question} className="bg-white p-5 border border-gray-100">
                        <h3 className="font-semibold text-primary mb-2">{faq.question}</h3>
                        <p className="text-sm text-charcoal/70">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
