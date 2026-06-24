'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { FOOTER_LINKS } from '@/lib/constants';
import { categoryApi, CategoryNode } from '@/lib/api';

export default function Footer() {
  const [categories, setCategories] = useState<CategoryNode[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryApi.getTree();
        if (res.success && res.data) {
          // We only want top-level active categories (where level = 0 or parent_id = null)
          // Adjust logic based on how the tree is returned
          setCategories(res.data.filter(c => c.is_active).slice(0, 6)); 
        }
      } catch (err) {
        console.error('Failed to fetch categories for footer:', err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <footer className="bg-white text-black pt-20 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col">
            <h2 className="font-heading italic text-3xl font-bold tracking-wide mb-6">
              Jagmeen Fashion
            </h2>
            <p className="text-black text-sm leading-relaxed mb-6 max-w-sm">
              Redefining luxury fashion for the modern era. Curated collections of designer clothing and accessories.
            </p>
            
            {/* <div className="space-y-3 mb-8">
              <a href="mailto:support@jagmeenfashion.com" className="flex items-center gap-3 text-sm text-white/80 hover:text-gold transition-colors">
                <Mail size={16} className="text-gold" />
                support@jagmeenfashion.com
              </a>
              <a href="https://wa.me/918809578544" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-white/80 hover:text-gold transition-colors">
                <Phone size={16} className="text-gold" />
                +91  8809578544
              </a>
            </div>

            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">IG</a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">TW</a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">FB</a>
            </div> */}
          </div>

          {/* Column 2: Top Categories */}
          <div className="flex flex-col">
            <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">Top Categories</h3>
            <ul className="space-y-4">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.slug}`} className="text-black hover:text-white transition-colors text-sm capitalize">
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 w-24 bg-white/10 rounded animate-pulse"></div>
                  ))}
                </div>
              )}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-black hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">Get In Touch</h3>

            <div className="space-y-3 mb-8">
              <a href="mailto:support@jagmeenfashion.com" className="flex items-center gap-3 text-sm text-black hover:text-gold transition-colors">
                <Mail size={16} className="text-gold" />
                support@jagmeenfashion.com
              </a>
              <a href="https://wa.me/918809578544" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-black hover:text-gold transition-colors">
                <Phone size={16} className="text-gold" />
                +91  8809578544
              </a>
            </div>

            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">IG</a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">TW</a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">FB</a>
            </div>

            
            
            {/* <p className="text-white/60 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers, new arrivals, and insider styling tips.
            </p> */}
            {/* <form className="mt-2" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/20 rounded-sm py-3 px-4 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors text-sm"
                  required
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 h-full px-4 text-gold hover:text-white transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              <p className="text-white/40 text-xs mt-3">
                By subscribing, you agree to our <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link> and <Link href="/terms" className="underline hover:text-white">Terms of Service</Link>.
              </p>
            </form> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Jagmeen Fashion. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6 text-xs text-white/40">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
