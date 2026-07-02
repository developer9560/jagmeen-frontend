'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/format';
import { Trash2, ShoppingBag } from 'lucide-react';
import type { CartData } from '@/lib/api';

export default function CartPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { getCartItems, removeItem, updateItemQuantity, clearCart } = useCart();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    const data = await getCartItems();
    setCartData(data);
    setIsLoading(false);
  }, [getCartItems]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isAuthenticated) {
        fetchCart();
      } else if (!authLoading) {
        setIsLoading(false);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [authLoading, fetchCart, isAuthenticated]);

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const success = await updateItemQuantity(itemId, newQuantity);
    if (success) fetchCart();
  };

  const handleRemove = async (itemId: number) => {
    const success = await removeItem(itemId);
    if (success) fetchCart();
  };

  const handleClear = async () => {
    const success = await clearCart();
    if (success) fetchCart();
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
          <ShoppingBag size={48} className="text-muted mb-6" />
          <h1 className="font-heading italic text-3xl md:text-4xl text-primary mb-4">Your Bag is Empty</h1>
          <p className="text-muted mb-8">Please sign in to view your bag and checkout.</p>
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

  const isEmpty = !cartData || cartData.items.length === 0;

  return (
    <>
      <Header />
      <main className="flex-1 bg-cream/30 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="font-heading italic text-4xl text-primary mb-10">Shopping Bag</h1>

          {isEmpty ? (
            <div className="bg-white p-12 text-center border border-gray-100 flex flex-col items-center">
              <ShoppingBag size={48} className="text-muted/50 mb-6" />
              <p className="text-charcoal mb-8 text-lg">You have no items in your shopping bag.</p>
              <Link 
                href="/products"
                className="bg-primary text-white text-xs tracking-[0.2em] uppercase font-bold px-8 py-4 hover:bg-gold transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary">Item</span>
                  <button onClick={handleClear} className="text-xs text-muted hover:text-red-600 transition-colors uppercase tracking-wider">
                    Clear Bag
                  </button>
                </div>

                <div className="space-y-6">
                  {cartData.items.map((item) => (
                    <div key={item.id} className="flex gap-6 p-4 bg-white border border-gray-100 relative group">
                      
                      {/* Image */}
                      <Link href={`/products/${item.product_slug}`} className="w-24 h-32 md:w-32 md:h-40 relative flex-shrink-0 bg-cream/50">
                        {item.product_image ? (
                          <Image src={item.product_image} alt={item.product_name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted/50">No Image</div>
                        )}
                      </Link>

                      {/* Details */}
                      <div className="flex flex-col justify-between flex-1 py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link href={`/products/${item.product_slug}`} className="font-heading italic text-xl text-primary hover:text-gold transition-colors">
                              {item.product_name}
                            </Link>
                            <button 
                              onClick={() => handleRemove(item.id)}
                              className="text-muted hover:text-red-600 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="mt-2 text-sm text-primary font-medium">
                            {formatPrice(item.price_at_add)}
                            {item.mrp > item.price_at_add && (
                              <span className="ml-2 text-muted line-through text-xs">{formatPrice(item.mrp)}</span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-200 h-10 w-28">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="flex-1 flex items-center justify-center text-primary hover:text-gold disabled:opacity-50 transition-colors"
                            >
                              -
                            </button>
                            <span className="flex-1 flex items-center justify-center text-primary font-semibold text-sm">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className="flex-1 flex items-center justify-center text-primary hover:text-gold disabled:opacity-50 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="font-semibold text-primary">
                            {formatPrice(item.item_total)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-100 p-8 sticky top-24">
                  <h2 className="font-heading italic text-2xl text-primary mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 text-sm text-charcoal/80 border-b border-gray-100 pb-6 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartData.total_items} items)</span>
                      <span>{formatPrice(cartData.total_price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-gold uppercase text-[10px] tracking-wider font-bold">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xl font-semibold text-primary mb-8">
                    <span>Total</span>
                    <span>{formatPrice(cartData.total_price)}</span>
                  </div>
                  
                  <Link href="/checkout" className="w-full bg-primary text-white text-xs tracking-[0.2em] uppercase font-bold py-4 hover:bg-gold transition-colors flex items-center justify-center gap-2">
                    Proceed to Checkout
                  </Link>
                  
                  <p className="text-center text-xs text-muted mt-4">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
