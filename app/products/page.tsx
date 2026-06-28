"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { productApi } from '@/lib/api';
import type { FeaturedProductsData, ProductCardData } from '@/types/product';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [pagination, setPagination] = useState<FeaturedProductsData['pagination'] | null>(null);
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
      setIsLoading(true);
      try {
        const res = await productApi.getProducts(pageNum, 20, minPrice, maxPrice, sortBy);
        if (cancelled) return;
        setProducts(res.data?.data || []);
        setPagination(res.data?.pagination || null);
        setError(null);
      } catch (err: unknown) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchProducts();

    return () => { cancelled = true; };
  }, [pageNum, minPrice, maxPrice, sortBy]);

  return (
    <>
      <Header />
      <main className="flex-1 bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-12 flex flex-col md:flex-row gap-8">
          
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
            </div>
          </aside>

          {/* Product grid */}
          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-heading italic text-2xl text-primary">All Products</h1>
                <p className="text-sm text-muted">{pagination ? `${pagination.total_records} Products` : ''}</p>
              </div>

              <div className="flex items-center gap-4">
                <label className="text-xs text-muted">Sort By</label>
                <select aria-label="Sort products" value={sortBy} onChange={(e) => { setSortBy(e.target.value as typeof sortBy); setPageNum(1); }} className="p-2 border border-gray-100 rounded text-sm bg-white">
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
                  <button disabled={pageNum <= 1} onClick={() => setPageNum((s) => Math.max(1, s - 1))} className="px-4 py-2 border rounded-sm hover:bg-gray-50 disabled:opacity-50">Prev</button>
                  <span className="text-sm">Page {pagination ? pagination.page : pageNum} of {pagination ? pagination.total_pages : 1}</span>
                  <button disabled={pagination ? !pagination.has_next : true} onClick={() => setPageNum((s) => s + 1)} className="px-4 py-2 border rounded-sm hover:bg-gray-50 disabled:opacity-50">Next</button>
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
