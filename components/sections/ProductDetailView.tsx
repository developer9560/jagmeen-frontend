'use client';

import { useState } from 'react';
import { ProductDetailData } from '@/types/product';
import ProductGallery from '@/components/ui/ProductGallery';
import { formatPrice, getDiscountPercent } from '@/lib/format';
import { Heart, ShoppingBag, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductDetailViewProps {
  product: ProductDetailData;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping'>('details');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const { addToCart } = useCart();
  const { checkIsWishlisted, toggleWishlist } = useWishlist();

  const isWishlisted = checkIsWishlisted(product.id);
  const discount = getDiscountPercent(product.price, product.mrp);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await addToCart(product.id, quantity);
    setIsAddingToCart(false);
  };

  const handleToggleWishlist = async () => {
    setIsTogglingWishlist(true);
    await toggleWishlist(product.id);
    setIsTogglingWishlist(false);
  };

  return (
    <section className="bg-white pt-3 pb-12 md:pt-4 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column - Gallery */}
          <div className="w-full relative">
            {/* Mobile Wishlist Overlay */}
            <button 
              onClick={handleToggleWishlist}
              disabled={isTogglingWishlist}
              className={`absolute top-4 left-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm flex md:hidden items-center justify-center transition-all duration-300 ${
                isWishlisted ? 'text-rose' : 'text-primary hover:text-rose'
              } disabled:opacity-50`}
            >
              <Heart size={20} className={isWishlisted ? 'fill-rose text-rose' : ''} />
            </button>

            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.is_featured && (
                <span className="bg-primary text-white text-[10px] tracking-[0.15em] uppercase font-bold px-3 py-1.5">
                  Featured
                </span>
              )}
              {discount && (
                <span className="bg-gold text-primary text-[10px] tracking-[0.15em] uppercase font-bold px-3 py-1.5">
                  {discount}% Off
                </span>
              )}
            </div>

            {/* Title & Pricing */}
            <h1 className="font-heading italic text-3xl md:text-5xl text-primary leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-8">
              <span className="text-2xl md:text-3xl font-semibold text-primary tracking-wide">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <span className="text-lg text-muted line-through mb-1">{formatPrice(product.mrp)}</span>
              )}
            </div>

            <div className="w-full h-px bg-gold/20 mb-8" />

            {/* Summary */}
            {product.summary && (
              <p className="text-charcoal/80 text-sm md:text-base leading-relaxed mb-8">
                {product.summary}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-row gap-2 sm:gap-4 mb-10">
              <div className="flex items-center border border-gray-200 h-14 flex-shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 sm:w-12 h-full flex items-center justify-center text-primary hover:text-gold transition-colors"
                >
                  -
                </button>
                <span className="w-8 sm:w-12 h-full flex items-center justify-center text-primary font-semibold text-sm">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 sm:w-12 h-full flex items-center justify-center text-primary hover:text-gold transition-colors"
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart || !product.stock_quantity}
                className="flex-1 h-14 bg-primary text-white text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] uppercase font-bold hover:bg-gold transition-colors flex items-center justify-center gap-2 sm:gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed px-2"
              >
                <ShoppingBag size={18} />
                {isAddingToCart ? 'Adding...' : product.stock_quantity ? 'Add to Bag' : 'Out of Stock'}
              </button>

              <button 
                onClick={handleToggleWishlist}
                disabled={isTogglingWishlist}
                className={`hidden md:flex w-14 h-14 border items-center justify-center transition-colors flex-shrink-0 ${
                  isWishlisted ? 'border-rose bg-rose/5 text-rose' : 'border-gray-200 text-primary hover:border-gold'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Heart size={20} className={isWishlisted ? 'fill-rose text-rose' : ''} />
              </button>
            </div>

            

            {/* Tabs for Details / Shipping */}
            <div className="border-b border-gray-200 flex gap-8 mb-6">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-4 text-xs tracking-[0.15em] uppercase font-bold relative transition-colors ${
                  activeTab === 'details' ? 'text-primary' : 'text-muted hover:text-primary'
                }`}
              >
                Product Details
                {activeTab === 'details' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-4 text-xs tracking-[0.15em] uppercase font-bold relative transition-colors ${
                  activeTab === 'shipping' ? 'text-primary' : 'text-muted hover:text-primary'
                }`}
              >
                Shipping & Returns
                {activeTab === 'shipping' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold" />
                )}
              </button>
            </div>

            <div className="text-sm text-charcoal/80 leading-relaxed prose prose-sm max-w-none">
              {activeTab === 'details' ? (
                <div>
                  {product.product_details ? (
                    typeof product.product_details === 'object' ? (
                      <div className="space-y-3 mt-2">
                        {Object.entries(product.product_details).map(([key, value]) => (
                          <div key={key} className="flex border-b border-gray-100 pb-2">
                            <span className="w-1/3 font-semibold text-primary capitalize">{key}</span>
                            <span className="w-2/3 text-muted">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: product.product_details }} />
                    )
                  ) : (
                    <p>No detailed information available for this product.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p><strong>Standard Delivery:</strong> 3-5 business days.</p>
                  <p><strong>Express Delivery:</strong> 1-2 business days available at checkout.</p>
                  <p><strong>Returns:</strong> You can return any item within 14 days of receipt for a full refund or exchange. Items must be unworn, unwashed, and have original tags attached.</p>
                </div>
              )}
            </div>
            {/* Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <div className="flex flex-col items-center justify-center p-4 bg-cream/30 text-center gap-2">
                <Truck size={24} className="text-gold" />
                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-cream/30 text-center gap-2">
                <RotateCcw size={24} className="text-gold" />
                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">14 Days Return</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-cream/30 text-center gap-2">
                <Shield size={24} className="text-gold" />
                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Secure Payment</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
