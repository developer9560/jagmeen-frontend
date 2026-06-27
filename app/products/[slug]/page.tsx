'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductDetailView from '@/components/sections/ProductDetailView';
import ProductCard from '@/components/ui/ProductCard';
import { productApi } from '@/lib/api';
import type { ProductCardData, ProductDetailData } from '@/types/product';
import Link from 'next/link';





export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductCardData[]>([]);
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

          productApi
            .getSimilarProducts(slug, 8)
            .then((similarResponse) => {
              if (!cancelled) setSimilarProducts(similarResponse.data || []);
            })
            .catch(() => {
              if (!cancelled) setSimilarProducts([]);
            });
        }
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load product details.');
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
          <>
            <ProductDetailView product={product} />
            {similarProducts.length > 0 && (
              <section className="bg-white py-12 md:py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                  <div className="flex items-end justify-between gap-4 mb-8">
                    <div>
                      <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-2">
                        Related Products
                      </p>
                      <h2 className="font-heading italic text-3xl md:text-4xl text-primary">
                        You May Also Like
                      </h2>
                    </div>
                    <Link href="/products" className="text-xs uppercase tracking-widest font-bold text-primary hover:text-gold">
                      View All
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
                    {similarProducts.map((item) => (
                      <ProductCard key={item.id} product={item} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
