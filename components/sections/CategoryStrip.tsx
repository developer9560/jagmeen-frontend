'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';

export default function CategoryStrip() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="font-heading italic text-3xl md:text-4xl text-primary text-center mb-10">
          Shop by Category
        </h2>
        
        {/* Horizontal scroll container on mobile, flex wrap on desktop */}
        <div className="flex overflow-x-auto pb-6 scrollbar-hide snap-x md:flex-wrap md:justify-center gap-6 md:gap-8 lg:gap-12">
          {CATEGORIES.map((category, index) => (
            <Link 
              key={category.name}
              href={category.href}
              className="flex flex-col items-center group min-w-[100px] snap-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream border border-gold/20 flex items-center justify-center text-3xl md:text-4xl shadow-sm group-hover:scale-105 group-hover:border-gold group-hover:shadow-md transition-all duration-300 ease-out mb-4 relative overflow-hidden">
                {/* Decorative hover glow */}
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300">
                  {category.icon}
                </span>
              </div>
              <span className="font-medium text-sm md:text-base text-primary group-hover:text-gold transition-colors">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
