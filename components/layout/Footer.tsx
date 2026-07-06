'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mail, Phone, MapPin
} from 'lucide-react';
import { FOOTER_LINKS } from '@/lib/constants';
import { categoryApi, CategoryNode } from '@/lib/api';
import { SiInstagram, SiFacebook, SiX } from '@icons-pack/react-simple-icons';


export default function Footer() {
  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [showAllSubcats, setShowAllSubcats] = useState(false);
  const PREVIEW_COUNT = 6;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryApi.getTree();
        if (res.success && res.data) {
          // We only want top-level active categories (where level = 0 or parent_id = null)
          // Load all top-level categories (don't limit to 6) so we can aggregate subcategories
          setCategories(res.data.filter(c => c.is_active));
        }
      } catch (err) {
        console.error('Failed to fetch categories for footer:', err);
      }
    }
    fetchCategories();
  }, []);

  // Flatten subcategories (two levels down): prefer grandchildren (child.children),
  // otherwise include the immediate child. This aggregates all concrete subcategory items.
  const subcategories = categories.flatMap((c) =>
    (c.children || []).flatMap((child) => {
      if (child.children && child.children.length > 0) {
        return child.children;
      }
      return [child];
    })
  ).filter((s) => s.is_active);

  return (
    <footer className="bg-white text-black pt-20 pb-6 ">
      <div className="w-full mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Column 1: Brand Info */}
          <div className="flex flex-col mt-0  p-0">
            <h2 className=" p-0  uppercase text-3xl font-bold tracking-wide mb-4">
              Jagmeen
            </h2>
            <p className="text-black text-sm leading-relaxed  max-w-[250px] ">
              Elevating everyday fashion with premium-quality clothing, modern designs, and exceptional comfort.
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








          {/* Column 2: all sub categories of top categories */}


          {/* Column 2: Top Categories */}
          <div className="flex flex-col  py-2">
            <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Shop
            </h3>
            <ul className="space-y-4">
              {subcategories.length > 0 ? (
                (showAllSubcats ? subcategories : subcategories.slice(0, PREVIEW_COUNT)).map((sub) => (
                  <li key={sub.id}>
                    <Link href={`/category/${sub.slug}`} className="text-black hover:text-black hover:font-bold transition-colors text-sm capitalize">
                      {sub.name}
                    </Link>
                  </li>
                ))
              ) : categories.length > 0 ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                  ))}
                </div>
              )}
              {subcategories.length > PREVIEW_COUNT && (
                <li>
                  <button
                    onClick={() => setShowAllSubcats((s) => !s)}
                    className="text-sm text-primary hover:underline"
                    aria-expanded={showAllSubcats}
                  >
                    {showAllSubcats ? 'Show less' : `More (${subcategories.length - PREVIEW_COUNT})`}
                  </button>
                </li>
              )}
            </ul>
          </div>



          <div className="flex flex-col  py-2">
            <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-6">
              Top Categories
            </h3>
            <ul className="space-y-4">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.slug}`} className="text-black hover:text-black hover:font-bold transition-colors text-sm capitalize">
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                  ))}
                </div>
              )}
            </ul>
          </div>



          {/* Column 3: Quick Links */}
          <div className="flex flex-col py-2">
            <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-black hover:text-black hover:font-bold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* {FOOTER_LINKS.help.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-black hover:text-black hover:font-bold transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))} */}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          {/* <div className="flex flex-col py-2 ">
            <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-6">Get In Touch</h3>

            <div className="space-y-3 mb-8">
              <a href="mailto:jagmeensupportteam@gmail.com" className="flex items-center gap-3 text-sm text-black hover:text-gold transition-colors">
                <Mail size={16} className="text-gold" />
                jagmeensupportteam@gmail.com
              </a>
              <a href="https://wa.me/918809578544" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-black hover:text-gold transition-colors">
                <Phone size={16} className="text-gold" />
                +91  8809578544
              </a>
            </div>

            <div className="flex gap-4">
              <a href="https://www.instagram.com/jagmeenfashion" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">
               <SiInstagram color="#E1306C" size={24} title="Instagram" />
              </a>
              <a href="https://x.com/jagmeenfashion" target="_blank" rel="noopener noreferrer" aria-label="X" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">
              <SiX color="#000000" size={24} title="X (formerly Twitter)" />
              </a>
              <a href="https://www.facebook.com/jagmeenfashion" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gold hover:text-primary hover:border-gold transition-all font-serif font-bold text-sm">
              <SiFacebook color="#1877F2" size={24} title="Facebook" />
              </a>
            </div>
          </div> */}


        </div>


        <div className=" pb-15 grid grid-cols-1 lg:grid-cols-4 md:flex-row justify-between items-center gap-4">

          <div className="flex flex-col py-2">
            <p className="text-black text-sm leading-relaxed  max-w-[250px] ">
              GSTIN: 27AAJCG1680H1Z9
            </p>
          </div>
          <div className="flex flex-col py-2">
            <a href="https://wa.me/918809578544" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-black hover:text-gold transition-colors">
              <Phone size={16} className="text-gold" />
              +91  8809578544
            </a>
          </div>

          <div className="flex flex-col py-2">
            <a href="mailto:jagmeensupportteam@gmail.com" className="flex items-center gap-3 text-sm text-black hover:text-gold transition-colors">
              <Mail size={16} className="text-gold" />
              jagmeensupportteam@gmail.com
            </a>

          </div>



          <div className="flex flex-col py-2">

            <p className="flex items-center gap-3 text-sm leading-relaxed  ">
              <MapPin size={16} className="text-gold" />
              123 Fashion Street, Style City, SC 12345
            </p>



          </div>

        </div>


        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black/50 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Jagmeen Fashion. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6 text-xs text-black/50">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-black transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
