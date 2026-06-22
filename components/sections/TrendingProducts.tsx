'use client';

import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { TRENDING_PRODUCTS } from '@/lib/constants';
import type { ProductCardData } from '@/types/product';

export default function TrendingProducts() {
  return (
    <section className="bg-cream/30 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
          <div>
            <h2 className="font-heading italic text-4xl md:text-5xl text-primary mb-4">
              Trending Summer Picks
            </h2>
            <div className="w-24 h-[2px] bg-gold"></div>
          </div>
          <Link 
            href="/trending" 
            className="text-sm font-bold uppercase tracking-wider text-primary hover:text-gold transition-colors mt-6 md:mt-0 flex items-center gap-2 group"
          >
            View All Collection
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {TRENDING_PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                name: product.name,
                slug: product.name.toLowerCase().replace(/\s+/g, '-'),
                price: product.price,
                mrp: product.originalPrice || product.price,
                primary_image: product.image,
                is_featured: false,
                summary: product.name,
              } as unknown as ProductCardData} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
