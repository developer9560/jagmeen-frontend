'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SearchBox from '@/components/ui/SearchBox';
import ProductCard from '@/components/ui/ProductCard';
import { productApi } from '@/lib/api';
import type { ProductCardData } from '@/types/product';
import { useSearchParams } from 'next/navigation';

function SearchPageContent() {
  const params = useSearchParams();
  const q = params.get('q') || '';
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuery(q);
    async function fetchResults() {
      if (!q) return setResults([]);
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.jagmeenfashion.com'}/api/products/search?q=${encodeURIComponent(q)}&size=100`);
        const data = await res.json();
        if (data.success) {
          setResults(data.data?.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchResults();
  }, [q]);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="mb-6">
        <SearchBox initial={query} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Search results for "{query}"</h2>

          {isLoading ? (
            <div className="py-10 text-center">Loading...</div>
          ) : results.length === 0 ? (
            <div className="py-10 text-center">No products found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        <aside className="hidden md:block">
          <div className="bg-white p-4 rounded shadow">Filters (future)</div>
        </aside>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="py-10 text-center">Loading search results...</div>}>
        <SearchPageContent />
      </Suspense>
      <Footer />
    </>
  );
}
