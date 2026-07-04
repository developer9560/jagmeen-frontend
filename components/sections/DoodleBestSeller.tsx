'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import FeaturedProductSkeleton from '@/components/ui/FeaturedProductSkeleton';

import { productApi } from '@/lib/api';
import type { ProductCardData } from '@/types/product';
import DoodleProductCard from '@/components/ui/DoodleProductCard';

const FEATURED_LIMIT = 8;

export default function DoodleBestSeller() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadFeatured() {
      try {
        const response = await productApi.getBestSellers(1, FEATURED_LIMIT);
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

    loadFeatured();
    return () => { cancelled = true; };
  }, []);

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollLeft = carousel.scrollLeft;
    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;

    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scrollByItems = (itemCount: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const item = carousel.querySelector<HTMLDivElement>('[data-carousel-item]');
    const carouselInner = carousel.querySelector<HTMLElement>('div.flex');
    const gap = carouselInner ? parseInt(getComputedStyle(carouselInner).columnGap || '0', 10) : 0;
    const itemWidth = item ? item.clientWidth + gap : 0;
    const scrollDistance = itemWidth * itemCount;

    carousel.scrollBy({ left: scrollDistance, behavior: 'smooth' });
  };

  const handleButtonScroll = (direction: 'left' | 'right') => {
    const itemsToScroll = window.innerWidth >= 768 ? 4 : 1;
    const distance = direction === 'left' ? -itemsToScroll : itemsToScroll;
    scrollByItems(distance);
  };

  useEffect(() => {
    handleScroll();
  }, [products]);

  return (
    <section className="bg-white py-6 md:py-8">
      <div className="max-full mx-auto px-4 md:px-8">
        

        {isLoading && (
          <div className="overflow-x-auto scrollbar-hide carousel py-4">
            <div className="flex gap-14 snap-x snap-mandatory scroll-smooth px-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="snap-start flex-shrink-0 basis-[calc(48%-1.5rem)] sm:basis-[calc(32.5%-1.333rem)] md:basis-[calc(23.75%-1.25rem)]"
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
            <p className="font-heading  text-2xl text-primary/40 mb-2">Coming Soon</p>
            <p className="text-sm text-muted">Featured pieces will appear here once added.</p>
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              ref={carouselRef}
              onScroll={handleScroll}
              className="overflow-x-auto scrollbar-hide py-4"
            >
              <div className="flex gap-14 snap-x snap-mandatory scroll-smooth px-4">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    data-carousel-item
                    className="snap-start flex-shrink-0 basis-[calc(48%-1.5rem)] sm:basis-[calc(32.5%-1.333rem)] md:basis-[calc(23.75%-1.25rem)]"
                  >
                    <DoodleProductCard product={product} index={index} />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleButtonScroll('left')}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-opacity duration-300 hover:bg-gold hover:text-white sm:flex ${isHovered && canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} 
              strokeWidth={1.5} />
              
            </button>

            <button
              type="button"
              onClick={() => handleButtonScroll('right')}
              className={`absolute  right-4 top-1/2 -translate-y-1/2 z-20 hidden h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-opacity duration-300 hover:bg-gold hover:text-white sm:flex ${isHovered && canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        )}
        <div className="flex justify-center h-30 w-full ">
            
                <Link href="/best-sellers" className="text-sm font-bold uppercase tracking-wider text-primary hover:text-gold transition-colors flex  justify-center items-center  group h-10 w-30 border border-gold  mt-6 md:mt-0 gap-2">
                    View All
                    
                </Link>
        </div>

        
      </div>
    </section>
  );
}
