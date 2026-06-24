"use client";

import type { MouseEvent } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import type { ProductCardData } from '@/types/product';
import { formatPrice } from '@/lib/format';

export default function ProductCard({ product }: { product: ProductCardData }) {
  const { addToCart } = useCart();
  const { toggleWishlist, checkIsWishlisted } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discountPercent =
    product.mrp > 0 ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  const handleAdd = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    await addToCart(product.id, 1);
    setIsAddingToCart(false);
  };

  const handleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="bg-white rounded-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative bg-neutral-50 aspect-[3/4] flex items-center justify-center overflow-hidden">
          {product.primary_image ? (
            <Image
              src={product.primary_image}
              alt={product.name}
              width={400}
              height={500}
              className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted bg-gray-100">No image</div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {/* {discountPercent > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm">
                -{discountPercent}%
              </span>
            )} */}
            {product.is_best_seller && (
              <span className="bg-gold text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm">
                Best Seller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hover:bg-rose-50 transition-all duration-300 z-10"
          >
            <Heart
              size={16}
              className={`${checkIsWishlisted(product.id) ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`}
            />
          </button>

          {/* Quick Add Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <button
              onClick={(e) => { e.preventDefault(); handleAdd(e); }}
              className="w-full bg-black/90 backdrop-blur-sm text-white py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors rounded-sm shadow-md"
            >
              {isAddingToCart ? 'Adding...' : 'Add to Bag'}
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`} className="block hover:text-gold transition-colors">
          <h3 className="text-sm font-medium text-primary line-clamp-1 mb-2">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-primary">{formatPrice(product.price)}</span>
            {product.mrp > product.price && (
              <span className="text-xs text-muted line-through">{formatPrice(product.mrp)}</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
