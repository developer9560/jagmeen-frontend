'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { recentViewApi } from '@/lib/api';
import { getToken } from '@/lib/auth-storage';

interface RecentProduct {
  id: number;
  product_id: number;
  product_name: string;
  product_slug: string;
  product_image: string | null;
  price: number;
  mrp: number;
  viewed_at: string;
}

interface RecentlyViewedProps {
  currentProductId?: number;
}

export default function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<RecentProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const token = getToken();
    if (!token) { setLoading(false); return; }

    recentViewApi
      .getRecentViews(token)
      .then((res: any) => {
        const data: RecentProduct[] = res?.data || [];
        setProducts(currentProductId ? data.filter((p) => p.product_id !== currentProductId) : data);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [isAuthenticated, currentProductId]);

  // Not logged in or no history → hide completely
  if (!isAuthenticated || (!loading && products.length === 0)) return null;

  return (
    <section className="bg-[#FAF8F5] py-12 md:py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl text-primary uppercase tracking-widest">
            Recently Viewed
          </h2>
          <div className="w-12 h-0.5 bg-gold mt-2" />
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded-sm">
                <div className="aspect-[3/4] bg-gray-200 rounded-sm" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {products.map((item) => {
              const discount =
                item.mrp > item.price
                  ? Math.round(((item.mrp - item.price) / item.mrp) * 100)
                  : 0;

              return (
                <Link
                  key={item.id}
                  href={`/products/${item.product_slug}`}
                  className="group block bg-white border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                    {item.product_image ? (
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs uppercase tracking-wider">
                        No Image
                      </div>
                    )}
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider truncate leading-snug mb-1">
                      {item.product_name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-primary">₹{item.price}</span>
                      {item.mrp > item.price && (
                        <span className="text-xs text-gray-400 line-through">₹{item.mrp}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
