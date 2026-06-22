'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col">
            <h2 className="font-heading italic text-3xl font-bold tracking-wide mb-6">
              Jagmeen Fashion
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
              Redefining luxury fashion for the modern era. Curated collections of designer clothing and accessories for those who appreciate the finer things.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">
                IG
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">
                TW
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">
                FB
              </a>
              <a href="#" aria-label="Pinterest" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-lg">
                P
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col">
            <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Help */}
          <div className="flex flex-col">
            <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">Customer Care</h3>
            <ul className="space-y-4">
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
            <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-6">Stay Connected</h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers, new arrivals, and insider styling tips.
            </p>
            <form className="mt-2" onSubmit={(e) => e.preventDefault()}>
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
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Jagmeen Fashion. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
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
