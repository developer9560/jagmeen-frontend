'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductDetailData } from '@/types/product';
import ProductGallery from '@/components/ui/ProductGallery';
import { formatPrice, getDiscountPercent } from '@/lib/format';
import { Heart, ShoppingBag, Truck, Shield, RotateCcw, X ,Share2Icon} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductDetailViewProps {
  product: ProductDetailData;
}

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}



export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [copied, setCopied] = useState(false);

  const { addToCart } = useCart();
  const { checkIsWishlisted, toggleWishlist } = useWishlist();
  const router = useRouter();

  const isWishlisted = checkIsWishlisted(product.id);

  const currentSize = product.sizes && product.sizes.length > 0 ? product.sizes[selectedSizeIdx] : null;
  const currentPrice = currentSize ? currentSize.price : 0;
  const currentMrp = currentSize ? currentSize.mrp : 0;
  const discount = currentPrice > 0 ? getDiscountPercent(currentPrice, currentMrp) : 0;


  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await addToCart(product.id, quantity, currentSize?.size);
    setIsAddingToCart(false);
  };

  const handleBuyItNow = async () => {
    if (!currentSize) return;

    setIsAddingToCart(true);
    const added = await addToCart(product.id, quantity, currentSize.size);
    setIsAddingToCart(false);

    if (added) {
      router.push('/checkout');
    }
  };

  const handleToggleWishlist = async () => {
    setIsTogglingWishlist(true);
    await toggleWishlist(product.id);
    setIsTogglingWishlist(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.summary || `Check out this amazing product from Jagmeen Fashion!`,
      url: `https://www.jagmeenfashion.com/products/${product.slug}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <section className="bg-white pt-3 pb-12 md:pt-4 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column - Gallery */}
          <div className="w-full relative lg:col-span-8 ">
            {/* Mobile Wishlist Overlay */}
            {/* <button
              onClick={handleToggleWishlist}
              disabled={isTogglingWishlist}
              className={`absolute top-4 left-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full shadow-sm flex md:hidden items-center justify-center transition-all duration-300 ${isWishlisted ? 'text-rose' : 'text-primary hover:text-rose'
                } disabled:opacity-50`}
            >
              <Heart size={20} className={isWishlisted ? 'fill-rose text-rose' : ''} />
            </button> */}

            <ProductGallery images={product.images} productName={product.name} />

            
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col lg:col-span-4 lg:pl-4">
            {/* Title & Pricing */}
            <h1 className="  text-xl md:text-2xl text-primary leading-tight mb-4">
              {product.name.toUpperCase()}
            </h1>

            <div className="flex items-end gap-4 mb-8">
              {currentSize ? (
                <>
                  <span className="text-xl md:text-2xl font-semibold text-primary tracking-wide">
                    {formatPrice(currentPrice)}
                  </span>
                  {currentMrp > currentPrice && (
                    <span className="text-lg text-muted line-through mb-1">{formatPrice(currentMrp)}</span>
                  )}
                </>
              ) : (
                <span className="text-2xl md:text-3xl font-semibold text-primary tracking-wide">
                  Price Unavailable
                </span>
              )}
            </div>


             {/* Summary */}
            {product.summary && (
              <p className="text-charcoal/80 text-sm md:text-base leading-relaxed mb-8">
                {product.summary}
              </p>
            )}

            {/* Sizes Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-semibold text-primary uppercase tracking-widest">Select Size</p>
                  {product.size_chart && (
                    <button 
                      onClick={() => setShowSizeChart(true)}
                      className="text-sm underline underline-offset-4 text-charcoal hover:text-primary transition-colors"
                    >
                      Size chart
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((s, idx) => (
                    <button
                      key={s.id || idx}
                      onClick={() => setSelectedSizeIdx(idx)}
                      className={`h-12 min-w-[3rem] px-4 border flex items-center justify-center text-sm font-medium transition-colors ${selectedSizeIdx === idx
                        ? 'border-primary  text-black'
                        : 'border-gray-200 text-charcoal '
                        }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* <div className="w-full h-px bg-gold/20 mb-8" /> */}

            

            {/* Actions */}
            <div className="flex flex-col gap-2 sm:gap-4 mb-10">
              <div className="flex items-center  h-14 flex-shrink-0   overflow-hidden">
                <div className="  flex items-center justify-center border border-gray-200 h-full" >

                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 sm:w-12 h-full flex items-center justify-center text-primary hover:text-red-300 transition-colors "
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
                  onClick={handleToggleWishlist}
                  disabled={isTogglingWishlist}
                  className={`hidden md:flex w-14 h-14 border items-center justify-center transition-colors flex-shrink-0 ${isWishlisted ? 'border-rose bg-rose/5 text-rose' : 'border-gray-200 text-primary hover:border-red-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-rose text-rose' : ''} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-4 flex-1">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || !currentSize}
                  className="w-full h-14 text-black text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] uppercase font-bold  border-1 cursor-pointer hover:border-red-500 transition-colors flex items-center justify-center gap-2 sm:gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed px-2"
                >
                  <ShoppingBag size={18} />
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </button>

                <button
                  onClick={handleBuyItNow}
                  disabled={isAddingToCart || !currentSize}
                  className="w-full h-14 border-1  cursor-pointer text-primary text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] uppercase font-bold hover:border-red-500 transition-colors flex items-center justify-center gap-2 sm:gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed px-2"
                >
                  Buy It Now
                </button>
              </div>

            </div>




            {/* Service Highlights */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              <div className="flex flex-col items-center justify-center p-4 bg-cream/30 text-center gap-2">
                <Truck size={24} className="text-gold" />
                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-cream/30 text-center gap-2">
                <RotateCcw size={24} className="text-gold" />
                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">3 Day Exechange </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-cream/30 text-center gap-2">
                <Shield size={24} className="text-red-600" />
                <span className="text-[10px] uppercase tracking-wider text-primary font-semibold">Secure Payment</span>
              </div>
            </div> */}

          </div>
        </div>
              {/* Accordions below gallery */}
            <div className="mt-8 border-t border-gray-200">
              {/* Product Details Accordion */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  className="w-full py-4 flex justify-between items-center text-sm tracking-[0.15em] uppercase font-bold text-primary hover:text-gold transition-colors"
                >
                  Product Details
                  <span className="text-xl font-light">{isDetailsOpen ? '-' : '+'}</span>
                </button>
                {isDetailsOpen && (
                  <div className="pb-6 text-sm text-charcoal/80 leading-relaxed prose prose-sm max-w-none animate-fade-in">
                    {product.product_details ? (
                      typeof product.product_details === 'object' ? (
                        <div className="space-y-3">
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
                )}
              </div>

              {/* Shipping & Returns Accordion */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setIsShippingOpen(!isShippingOpen)}
                  className="w-full py-4 flex justify-between items-center text-sm tracking-[0.15em] uppercase font-bold text-primary hover:text-gold transition-colors"
                >
                  Shipping & Returns
                  <span className="text-xl font-light">{isShippingOpen ? '-' : '+'}</span>
                </button>
                {isShippingOpen && (
                  <div className="pb-6 text-sm text-charcoal/80 leading-relaxed prose prose-sm max-w-none animate-fade-in">
                    <div className="space-y-4">
                      <p><strong>Standard Delivery:</strong> 3-5 business days.</p>
                      <p><strong>Express Delivery:</strong> 1-2 business days available at checkout.</p>
                      <p><strong>Returns:</strong> You can return any item within 14 days of receipt for a full refund or exchange. Items must be unworn, unwashed, and have original tags attached.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Note & Share */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs sm:text-sm text-charcoal/80 bg-cream/30 p-3 rounded-sm flex-1">
                <span className="font-bold text-primary whitespace-nowrap">Please Note:</span>
                <span>Sale and clearance items are final sale. Returns and exchanges are not applicable on discounted products.</span>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center justify-center gap-2 border border-gray-200 px-6 py-3 hover:border-primary hover:text-primary transition-all uppercase tracking-widest text-xs font-bold w-full xl:w-auto shrink-0"
              >
                Share
                <Share2Icon size={16} />
              </button>
            </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && product.size_chart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#FAF8F5] relative max-w-2xl w-full shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-[#FAF8F5] sticky top-0 z-10">
              <h3 className="text-sm tracking-widest uppercase font-semibold text-primary">Size Chart</h3>
              <button 
                onClick={() => setShowSizeChart(false)}
                className="text-gray-500 hover:text-primary transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto flex justify-center bg-white">
              <img 
                src={product.size_chart} 
                alt="Size Chart" 
                className="max-w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
