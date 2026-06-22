'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import { Trash2, Heart } from 'lucide-react';
import type { WishlistData } from '@/lib/api';

export default function WishlistPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { getWishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const [wishlistData, setWishlistData] = useState<WishlistData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

  const fetchWishlist = async () => {
    setIsLoading(true);
    const data = await getWishlistItems();
    setWishlistData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  const handleRemove = async (productId: number) => {
    const success = await toggleWishlist(productId);
    if (success) {
      // Optimistically remove from state
      setWishlistData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          total_items: prev.total_items - 1,
          items: prev.items.filter(i => i.product_id !== productId)
        };
      });
    }
  };

  const handleAddToCart = async (productId: number) => {
    setAddingToCartId(productId);
    await addToCart(productId, 1);
    setAddingToCartId(null);
  };

  if (authLoading || isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center bg-cream/30">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex flex-col items-center justify-center bg-cream/30 px-4 text-center">
          <Heart size={48} className="text-muted mb-6" />
          <h1 className="font-heading italic text-3xl md:text-4xl text-primary mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted mb-8">Please sign in to view your saved items.</p>
          <Link 
            href="/login"
            className="bg-primary text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-4 hover:bg-gold transition-colors"
          >
            Sign In
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const isEmpty = !wishlistData || wishlistData.items.length === 0;

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream/30 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-10">
            <h1 className="font-heading italic text-4xl text-primary">My Wishlist</h1>
            <span className="text-sm font-semibold uppercase tracking-wider text-muted">
              {wishlistData?.total_items || 0} Items
            </span>
          </div>

          {isEmpty ? (
            <div className="bg-white p-12 text-center border border-gray-100 flex flex-col items-center">
              <Heart size={48} className="text-muted/50 mb-6" />
              <p className="text-charcoal mb-8 text-lg">You haven't saved any items yet.</p>
              <Link 
                href="/products"
                className="bg-primary text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-4 hover:bg-gold transition-colors"
              >
                Discover Styles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {wishlistData.items.map((item) => (
                <div key={item.id} className="bg-white border border-gray-100 group flex flex-col">
                  {/* Image Area */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream/50">
                    <Link href={`/products/${item.product_slug}`}>
                      {item.product_image ? (
                        <Image 
                          src={item.product_image} 
                          alt={item.product_name} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted/50">No Image</div>
                      )}
                    </Link>
                    
                    {/* Delete Button */}
                    <button 
                      onClick={() => handleRemove(item.product_id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-muted hover:text-red-600 transition-colors shadow-sm"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={14} />
                    </button>
                    
                    {/* Out of stock badge */}
                    {!item.stock_quantity && (
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                        <span className="bg-primary text-white text-[10px] tracking-widest uppercase font-bold px-4 py-2">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details Area */}
                  <div className="p-4 flex flex-col flex-1">
                    <Link href={`/products/${item.product_slug}`} className="flex-1">
                      <h3 className="font-heading italic text-lg text-primary mb-1 group-hover:text-gold transition-colors line-clamp-1">
                        {item.product_name}
                      </h3>
                      <div className="text-sm font-semibold text-primary mb-4">
                        {formatPrice(item.price)}
                        {item.mrp > item.price && (
                          <span className="ml-2 text-muted line-through text-xs font-normal">{formatPrice(item.mrp)}</span>
                        )}
                      </div>
                    </Link>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(item.product_id)}
                      disabled={!item.stock_quantity || addingToCartId === item.product_id}
                      className="w-full py-3 border border-primary text-xs tracking-widest uppercase font-bold hover:bg-primary hover:text-white transition-colors disabled:opacity-50 disabled:border-gray-200 disabled:text-muted disabled:hover:bg-transparent"
                    >
                      {addingToCartId === item.product_id 
                        ? 'Adding...' 
                        : item.stock_quantity 
                          ? 'Add to Bag' 
                          : 'Sold Out'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
