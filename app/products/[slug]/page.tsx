'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductDetailView from '@/components/sections/ProductDetailView';
import RecentlyViewed from '@/components/sections/RecentlyViewed';
import ProductCard from '@/components/ui/ProductCard';
import { productApi, recentViewApi } from '@/lib/api';
import type { ProductCardData, ProductDetailData } from '@/types/product';
import Link from 'next/link';
import DoodleProductCard from '@/components/ui/DoodleProductCard';
import { ChevronDown } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { getToken } from '@/lib/auth-storage';





export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Number of products visible initially
  const [visibleProducts, setVisibleProducts] = useState(4);
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
          setVisibleProducts(4);
          setError(null);

          // Track product view (existing analytics)
          if (fetchedProduct?.id) {
            productApi.trackProductView(fetchedProduct.id).catch(console.error);
          }

          // Track in recent views (only for logged-in users)
          if (fetchedProduct?.id && isAuthenticated) {
            const token = getToken();
            if (token) {
              recentViewApi.trackView(fetchedProduct.id, token).catch(console.error);
            }
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

  const loadMoreProducts = () => {
    setVisibleProducts((prev) =>
      Math.min(prev + 4, similarProducts.length)
    );
  };

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full overflow-hidden bg-cream/30">
        {/* Breadcrumbs */}
        {/* <div className="bg-cream/30 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <nav className="text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2 text-muted">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
             
              <span>/</span>
              <span className="text-primary truncate max-w-[200px] md:max-w-md">
                {product ? product.name : slug}
              </span>
            </nav>
          </div>
        </div> */}

        {/* Content */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center py-32">
            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error || !product ? (
          <div className="flex-1 flex flex-col items-center justify-center py-32 px-4 text-center">
            <h1 className="font-heading  text-4xl text-primary mb-4">Product Not Found</h1>
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

                  <div className="flex justify-center mb-8">
                    <h2 className="font-heading text-3xl md:text-4xl text-primary uppercase">
                      You May Also Like
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
                    {similarProducts
                      .slice(0, visibleProducts)
                      .map((item) => (
                        <DoodleProductCard
                          key={item.id}
                          product={item}
                        />
                      ))}
                  </div>

                  {visibleProducts < similarProducts.length && (
                    <div className="flex justify-center mt-12">

                      <button
                        onClick={loadMoreProducts}
                        className="group flex flex-col items-center"
                      >
                        <ChevronDown
                          size={40}
                          strokeWidth={1.5}
                          className="transition-all duration-300 group-hover:translate-y-1"
                        />

                        <span className="text-xs tracking-[0.3em] uppercase mt-2">
                          Load More
                        </span>
                      </button>

                    </div>
                  )}

                </div>
              </section>
            )}
            {/* Recently Viewed — only for logged-in users */}
            <RecentlyViewed currentProductId={product?.id} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
