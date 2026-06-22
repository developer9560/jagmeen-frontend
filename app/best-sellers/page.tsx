'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InfiniteProductGrid from '@/components/ui/InfiniteProductGrid';
import { productApi } from '@/lib/api';

export default function BestSellersPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InfiniteProductGrid 
          title="Best Sellers" 
          fetchPage={productApi.getBestSellers} 
          pageSize={12} 
        />
      </main>
      <Footer />
    </>
  );
}
