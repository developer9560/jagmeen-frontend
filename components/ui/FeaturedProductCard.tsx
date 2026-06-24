'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import type { ProductCardData } from '@/types/product';
import { formatPrice, getDiscountPercent } from '@/lib/format';

interface FeaturedProductCardProps {
  product: ProductCardData;
  index?: number;
}

export default function FeaturedProductCard({ product, index = 0 }: FeaturedProductCardProps) {
  const router = useRouter();
  const { toggleWishlist, checkIsWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discount = getDiscountPercent(product.price, product.mrp);
  const productHref = `/products/${product.slug}`;

  // Sync initial wishlist state from context
  useEffect(() => {
    setIsWishlisted(checkIsWishlisted(product.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkIsWishlisted, product.id]);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Optimistic UI
    setIsWishlisted(!isWishlisted);
    
    const success = await toggleWishlist(product.id);
    if (!success) {
      // Revert if failed
      setIsWishlisted(isWishlisted);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    await addToCart(product.id, 1);
    setIsAddingToCart(false);
  };

  const handleImageClick = () => {
    router.push(productHref);
  };

  return (
    <article
      className="group relative flex flex-col bg-white overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(10,10,10,0.12)]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div
        onClick={handleImageClick}
        className="relative block aspect-[3/4] overflow-hidden bg-cream cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleImageClick();
          }
        }}
      >
        {product.primary_image && !imageError ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cream via-white to-rose/20 p-6">
            <div className="w-20 h-28 border border-gold/30 rounded-t-full rounded-b-md opacity-60" />
            <span className="font-heading italic text-primary/25 text-lg mt-6 text-center line-clamp-2">
              {product.name}
            </span>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-3 md:p-4 z-10">
          <div className="flex flex-col gap-1.5">
            {/* {product.is_featured && (
              <span className="bg-primary text-white text-[10px] tracking-[0.15em] uppercase font-bold px-2.5 py-1">
                Featured
              </span>
            )} */}
            {discount && (
              <span className="bg-white text-primary text-[10px] tracking-[0.15em] uppercase font-bold px-2.5 py-1">
                {discount}% Off
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleWishlistToggle}
            className="w-9 h-9 flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-105 z-20"
            aria-label="Add to wishlist"
          >
            <Heart
              size={24}
              className={`transition-colors ${isWishlisted ? 'fill-rose text-rose' : 'text-primary hover:text-rose'}`}
            />
          </button>
        </div>

        {/* Hover actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 flex gap-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex-1 bg-white text-primary py-2.5 text-[11px] tracking-widest uppercase font-semibold hover:bg-gold hover:text-primary transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShoppingBag size={14} />
            {isAddingToCart ? 'Adding...' : 'Add to Bag'}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(productHref);
            }}
            className="w-10 h-10 bg-primary text-white flex items-center justify-center hover:bg-gold transition-colors"
            aria-label="View product"
          >
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="relative p-4 md:p-5 border-t border-transparent group-hover:border-gold/30 transition-colors duration-300 border-gold/30">
        <div className="absolute top-0 left-5 right-5 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        <button
          type="button"
          onClick={() => router.push(productHref)}
          className="text-left w-full hover:opacity-80 transition-opacity"
        >
          <h3 className="font-heading italic text-lg md:text-xl text-primary leading-snug line-clamp-2 group-hover:text-gold transition-colors duration-300 mb-2">
            {product.name}
          </h3>
        </button>

        {/* {product.summary && (
          <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-3 hidden sm:block">
            {product.summary}
          </p>
        )} */}

        <div className="flex items-baseline gap-2.5">
          <span className="text-base md:text-lg font-semibold text-primary tracking-wide">
            {formatPrice(product.price)}.00
          </span>
          {product.mrp > product.price && (
            <span className="text-sm text-muted line-through">{formatPrice(product.mrp)}.00</span>
          )}
        </div>
      </div>
    </article>
  );
}
