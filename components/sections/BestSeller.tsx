'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import FeaturedProductCard from '@/components/ui/FeaturedProductCard';
import FeaturedProductSkeleton from '@/components/ui/FeaturedProductSkeleton';
import { productApi } from '@/lib/api';
import type { ProductCardData } from '@/types/product';

const BEST_SELLERS_LIMIT = 8;

export default function BestSeller() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadBestSellers() {
      try {
        const response = await productApi.getBestSellers(1, BEST_SELLERS_LIMIT);
        if (!cancelled) {
          setProducts(response.data?.data ?? []);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load best-selling products right now.');
          setProducts([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadBestSellers();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="bg-cream/30 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <div>
            {/* <p className="text-gold tracking-[0.3em] text-xs font-bold uppercase mb-3">
              Curated Selection
            </p> */}
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
              Best Sellers
            </h2>
            <div className="w-24 h-[2px] bg-white" />
          </div>
          <Link
            href="/best-sellers"
            className="text-sm font-bold uppercase tracking-wider text-primary hover:text-gold transition-colors mt-6 md:mt-0 flex items-center gap-2 group"
          >
            View All Collection
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {isLoading && (
          <div className="overflow-x-auto scrollbar-hide carousel py-4">
            <div className="flex gap-4 snap-x snap-mandatory scroll-smooth px-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="snap-start flex-shrink-0 basis-[calc(50%-1.5rem)] sm:basis-[calc(33.333%-1.333rem)] md:basis-[calc(25%-1.25rem)]"
                >
                  <FeaturedProductSkeleton />
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center py-16 border border-dashed border-gray-200 bg-white/50">
            <p className="text-charcoal/60 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-xs tracking-widest uppercase text-gold font-semibold hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-16 border border-dashed border-gray-200 bg-white/50">
            <p className="font-heading italic text-2xl text-primary/40 mb-2">Coming Soon</p>
            <p className="text-sm text-muted">Featured pieces will appear here once added.</p>
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="overflow-x-auto scrollbar-hide py-4">
            <div className="flex gap-4 snap-x snap-mandatory scroll-smooth px-4">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="snap-start flex-shrink-0 basis-[calc(50%-1.5rem)] sm:basis-[calc(33.333%-1.333rem)] md:basis-[calc(25%-1.25rem)]"
                >
                  <FeaturedProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
