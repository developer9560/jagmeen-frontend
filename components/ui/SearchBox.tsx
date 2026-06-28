"use client";

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Suggestion = {
  type: 'product' | 'category';
  id: number;
  name: string;
  slug?: string;
  primary_image?: string | null;
};

const searchbarItems = [
  "Mens",
  "Womens",
  "Kids",
  "Accessories",
  "Dresses",
  "Skirts",
];

export default function SearchBox({ initial = '' }: { initial?: string }) {
  const [query, setQuery] = useState(initial);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % searchbarItems.length);
        setFade(true); // fade in
      }, 300); // wait for fade out, then change
    }, 2000); // change every 2s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function fetchSuggestions() {
      if (!query || query.length < 1) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.jagmeenfashion.com'}/api/products/suggest?q=${encodeURIComponent(query)}&limit=8`);
        const data = await res.json();
        if (!cancelled && data.success) {
          setSuggestions(data.data || []);
          setShow(true);
        }
      } catch {
        // ignore
      }
    }

    const t = setTimeout(fetchSuggestions, 180);
    return () => { cancelled = true; clearTimeout(t); };
  }, [query]);

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <div className="relative w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if (query) setShow(true); }}
            placeholder=""
            aria-label="Search products and categories"
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-100 focus:outline-none"
          />

          {/* Animated placeholder — only show when input is empty */}
          {!query && (
            <span
              className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none select-none transition-opacity duration-300"
              style={{ opacity: fade ? 1 : 0 }}
            >
              {`Search "${searchbarItems[placeholderIndex]}"...`}
            </span>
          )}
        </div>
      </div>

      {show && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 shadow-lg rounded z-50 max-h-72 overflow-y-auto">
          <ul className="divide-y">
            {suggestions.map((s) => (
              <li key={`${s.type}-${s.id}`} className="p-2 hover:bg-cream">
                {s.type === 'product' ? (
                  <Link href={`/products/${s.slug}`} className="flex items-center gap-3">
                    {s.primary_image ? (
                      <Image
                        src={s.primary_image}
                        alt={`${s.name} search result image`}
                        width={48}
                        height={48}
                        sizes="48px"
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-cream" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-primary">{s.name}</div>
                      <div className="text-xs text-muted">Product</div>
                    </div>
                  </Link>
                ) : (
                  <Link href={`/category/${s.slug}`} className="flex items-center gap-3">
                    <div>
                      <div className="text-sm font-medium text-primary">{s.name}</div>
                      <div className="text-xs text-muted">Category</div>
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
