'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, ArrowUpRight , Plus } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import type { ProductCardData } from '@/types/product';
import { formatPrice, getDiscountPercent } from '@/lib/format';

interface FeaturedProductCardProps {
  product: ProductCardData;
  index?: number;
}

export default function DoodleProductCard({ product, index = 0 }: FeaturedProductCardProps) {
  const router = useRouter();
  const { toggleWishlist, checkIsWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const [wishlistOverride, setWishlistOverride] = useState<{ productId: number; value: boolean } | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discount = product.sizes && product.sizes.length > 0 
    ? getDiscountPercent(product.sizes[0].price, product.sizes[0].mrp) 
    : 0;
  const productHref = `/products/${product.slug}`;
  const contextWishlisted = checkIsWishlisted(product.id);
  const isWishlisted = wishlistOverride?.productId === product.id ? wishlistOverride.value : contextWishlisted;

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setWishlistOverride({ productId: product.id, value: !isWishlisted });
    
    const success = await toggleWishlist(product.id);
    if (!success) {
      setWishlistOverride(null);
      return;
    }

    window.setTimeout(() => setWishlistOverride(null), 500);
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
      className="group relative flex flex-col bg-white overflow-hidden transition-all duration-500"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div
        onClick={handleImageClick}
        className="relative block aspect-[2.7/4] overflow-hidden bg-cream cursor-pointer "
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
            alt={`${product.name} - buy online at Jagmeen Fashion`}
            fill
            quality={70}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cream via-white to-rose/20 p-6">
            <div className="w-20 h-28 border border-gold/30 rounded-t-full rounded-b-md opacity-60" />
            <span className="font-heading  text-primary/25 text-lg mt-6 text-center line-clamp-2">
              {product.name}
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-2 md:p-3 z-10">
          <div className="flex flex-col gap-1.5">
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
              size={22}
              strokeWidth={1.5}
              className={`transition-colors ${isWishlisted ? 'fill-rose text-rose' : 'text-primary  hover:text-rose'}`}
            />
          </button>
        </div>

        {/* Slide-up action button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(productHref);
          }}
          className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center  bg-white text-primary shadow-sm transition-all duration-300 sm:translate-y-full sm:opacity-0 group-hover:sm:translate-y-0 group-hover:sm:opacity-100 "
          aria-label="View product"
        >
          <Plus size={18} className="transition-transform duration-300 hover:rotate-90" />
        </button>
      </div>

      {/* Details */}
      <div className="relative p-4 md:p-5 border-t border-transparent group-hover:border-gold/30 transition-colors duration-300 border-gold/30">

        <button
          type="button"
          onClick={() => router.push(productHref)}
          className="text-left w-full hover:opacity-80 transition-opacity"
        >
          <h3 className="font-heading text-center text-sm md:text-md text-primary leading-snug line-clamp-2 ">
            {product.name}
          </h3>
        </button>

        

        <div className="flex items-center justify-center gap-2.5">
          {product.sizes && product.sizes.length > 0 ? (
            <>
              <span className="text-base text-center md:text-md font-semibold text-primary tracking-wide">
                {formatPrice(product.sizes[0].price)}.00
              </span>
              {product.sizes[0].mrp > product.sizes[0].price && (
                <span className="text-sm text-neutral-600 line-through">{formatPrice(product.sizes[0].mrp)}.00</span>
              )}
            </>
          ) : (
            <span className="text-base md:text-md font-semibold text-primary tracking-wide">Price Unavailable</span>
          )}
        </div>
      </div>
    </article>
  );
}
