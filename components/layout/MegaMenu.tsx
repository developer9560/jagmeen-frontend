'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { MegaMenuNavItem } from '@/types';

interface MegaMenuProps {
  item: MegaMenuNavItem;
  isVisible: boolean;
  onClose: () => void;
}

export default function MegaMenu({ item, isVisible, onClose }: MegaMenuProps) {
  return (
    <div
      className={`absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out origin-top ${
        isVisible
          ? 'opacity-100 visible translate-y-0 pointer-events-auto'
          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
      }`}
      onMouseEnter={(e) => e.stopPropagation()}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Subcategory columns */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {item.columns.map((column, colIndex) => (
              <div
                key={column.title}
                className={`transition-all duration-500 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{ transitionDelay: isVisible ? `${colIndex * 60}ms` : '0ms' }}
              >
                <h3 className="text-xs tracking-[0.2em] uppercase font-bold text-gold mb-5 pb-2 border-b border-gold/20">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center text-sm text-charcoal hover:text-primary transition-colors duration-200"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured panel */}
          <div
            className={`col-span-12 lg:col-span-4 transition-all duration-500 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}
            style={{ transitionDelay: isVisible ? '180ms' : '0ms' }}
          >
            <Link
              href={item.featured.href}
              onClick={onClose}
              className="group block relative h-full min-h-[220px] bg-primary overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-15" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose/10 rounded-full blur-3xl" />

              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <p className="text-gold text-xs tracking-[0.25em] uppercase font-bold mb-2">
                  {item.featured.subtitle}
                </p>
                <h4 className="font-heading italic text-3xl text-white mb-4 group-hover:text-gold transition-colors duration-300">
                  {item.featured.title}
                </h4>
                <span className="inline-flex items-center gap-2 text-white text-xs tracking-widest uppercase font-medium group-hover:gap-3 transition-all duration-300">
                  {item.featured.accent || 'Shop Now'}
                  <ArrowRight size={14} className="text-gold" />
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom quick link */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          <Link
            href={item.href}
            onClick={onClose}
            className="text-sm tracking-widest uppercase font-medium text-primary hover:text-gold transition-colors flex items-center gap-2"
          >
            Shop All {item.label}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
