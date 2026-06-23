"use client";

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { productApi, categoryApi } from '@/lib/api';

type Suggestion = {
  type: 'product' | 'category';
  id: number;
  name: string;
  slug?: string;
  primary_image?: string | null;
};

export default function SearchBox({ initial = '' }: { initial?: string }) {
  const [query, setQuery] = useState(initial);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.3dreamprint.cloud'}/api/products/suggest?q=${encodeURIComponent(query)}&limit=8`);
        const data = await res.json();
        if (!cancelled && data.success) {
          setSuggestions(data.data || []);
          setShow(true);
        }
      } catch (err) {
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
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query) setShow(true); }}
          placeholder="Search products, categories, keys..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-100 focus:outline-none"
        />
      </div>

      {show && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 shadow-lg rounded z-50 max-h-72 overflow-y-auto">
          <ul className="divide-y">
            {suggestions.map((s) => (
              <li key={`${s.type}-${s.id}`} className="p-2 hover:bg-cream">
                {s.type === 'product' ? (
                  <Link href={`/products/${s.slug}`} className="flex items-center gap-3">
                    {s.primary_image ? <img src={s.primary_image} alt={s.name} className="w-12 h-12 object-contain" /> : <div className="w-12 h-12 bg-cream" />}
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
