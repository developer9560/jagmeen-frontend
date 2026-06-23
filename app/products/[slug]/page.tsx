'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductDetailView from '@/components/sections/ProductDetailView';
import { productApi } from '@/lib/api';
import type { ProductDetailData } from '@/types/product';
import Link from 'next/link';





export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        const response = await productApi.getProductBySlug(slug);
        if (!cancelled) {
          const fetchedProduct = response.data as unknown as ProductDetailData;
          setProduct(fetchedProduct);
          setError(null);
          
          // Track view in background
          if (fetchedProduct?.id) {
            productApi.trackProductView(fetchedProduct.id).catch(console.error);
          }
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Failed to load product details.');
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full overflow-hidden bg-cream/30">
        {/* Breadcrumbs */}
        <div className="bg-cream/30 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <nav className="text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2 text-muted">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
             
              <span>/</span>
              <span className="text-primary truncate max-w-[200px] md:max-w-md">
                {product ? product.name : slug}
              </span>
            </nav>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center py-32">
            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error || !product ? (
          <div className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
            <h1 className="font-heading italic text-4xl text-primary mb-4">Product Not Found</h1>
            <p className="text-muted mb-8 max-w-md">
              {error || "We couldn't find the product you're looking for. It might have been removed or is temporarily unavailable."}
            </p>
            <Link 
              href="/"
              className="bg-primary text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-4 hover:bg-gold transition-colors inline-block"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <ProductDetailView product={product} />
        )}
      </main>
      <Footer />
    </>
  );
}
