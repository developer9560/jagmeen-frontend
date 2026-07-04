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

          

          {/* Product grid */}
          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-heading  text-2xl text-primary">{category?.name || seoPage?.h1 || fallbackTitle}</h1>
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
              </>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
