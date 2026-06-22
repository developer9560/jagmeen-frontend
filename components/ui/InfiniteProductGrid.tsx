'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import FeaturedProductCard from '@/components/ui/FeaturedProductCard';
import FeaturedProductSkeleton from '@/components/ui/FeaturedProductSkeleton';
import type { ProductCardData, FeaturedProductsData } from '@/types/product';
import type { ApiResponse } from '@/types/auth';

interface InfiniteProductGridProps {
  title: string;
  fetchPage: (page: number, size: number) => Promise<ApiResponse<FeaturedProductsData>>;
  pageSize?: number;
}

export default function InfiniteProductGrid({ 
  title, 
  fetchPage, 
  pageSize = 12 
}: InfiniteProductGridProps) {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);
  
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNext) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchPage(page, pageSize);
      if (response.data) {
        setProducts(prev => {
          // Prevent duplicates by checking IDs
          const existingIds = new Set(prev.map(p => p.id));
          const newProducts = (response.data?.data || []).filter(p => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
        setHasNext(response.data?.pagination?.has_next || false);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError('Unable to load products right now.');
    } finally {
      setIsLoading(false);
      setInitialLoad(false);
    }
  }, [page, hasNext, isLoading, fetchPage, pageSize]);

  // Handle intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNext && !isLoading && !initialLoad) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasNext, isLoading, initialLoad]);

  // Initial load effect
  useEffect(() => {
    if (initialLoad) {
      loadMore();
    }
  }, [loadMore, initialLoad]);

  return (
    <section className="bg-cream/30 py-6 md:py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h1 className="font-heading italic text-4xl md:text-5xl text-primary mb-4">
            {title}
          </h1>
          <div className="w-24 h-[2px] bg-gold" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product, index) => (
            <FeaturedProductCard key={`${product.id}-${index}`} product={product} index={index} />
          ))}
          
          {isLoading && (
            Array.from({ length: 4 }).map((_, i) => (
              <FeaturedProductSkeleton key={`skeleton-${i}`} />
            ))
          )}
        </div>

        {!isLoading && error && (
          <div className="text-center py-16 mt-8 border border-dashed border-gray-200 bg-white/50">
            <p className="text-charcoal/60 text-sm">{error}</p>
            <button
              onClick={() => {
                setError(null);
                loadMore();
              }}
              className="mt-4 text-xs tracking-widest uppercase text-gold font-semibold hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-16 mt-8 border border-dashed border-gray-200 bg-white/50">
            <p className="font-heading italic text-2xl text-primary/40 mb-2">Coming Soon</p>
            <p className="text-sm text-muted">Products will appear here once added.</p>
          </div>
        )}

        {/* Sentinel element for infinite scroll */}
        <div ref={observerTarget} className="h-10 w-full mt-8" />
      </div>
    </section>
  );
}
