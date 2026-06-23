'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const activeImage = sortedImages[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % sortedImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
  };

  if (!sortedImages.length) {
    return (
      <div className="aspect-[3/4] md:aspect-square bg-cream flex flex-col items-center justify-center p-6 w-full h-full relative overflow-hidden group rounded-sm">
        <div className="w-24 h-32 border-2 border-gold/20 rounded-t-full rounded-b-lg opacity-40 mb-6" />
        <span className="font-heading italic text-primary/30 text-xl text-center">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square md:aspect-[4/5] max-h-[450px] md:max-h-[550px] lg:max-h-[600px] bg-cream overflow-hidden rounded-sm group">
        {!imageError[activeIndex] && activeImage?.image_url ? (
          <Image
            src={activeImage.image_url}
            alt={`${productName} - View ${activeIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority
            onError={() => setImageError((prev) => ({ ...prev, [activeIndex]: true }))}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/50">
            <span className="font-heading italic text-primary/30 text-lg">Image Unavailable</span>
          </div>
        )}

        {/* Navigation Arrows */}
        {sortedImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute  left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md flex items-center justify-center rounded-full text-primary  opecity-100  md:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm"
              aria-label="Previous image"
            >
              <ChevronLeft size={20}  />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-md flex items-center justify-center rounded-full text-primary opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Expand Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md flex items-center justify-center rounded-full text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm"
          aria-label="View fullscreen"
        >
          <Expand size={18} />
        </button>
      </div>

      {/* Thumbnails */}
      {sortedImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {sortedImages.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-24 sm:w-24 sm:h-32 flex-shrink-0 bg-cream overflow-hidden rounded-sm transition-all duration-300 ${
                idx === activeIndex
                  ? 'ring-2 ring-gold ring-offset-2 opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              {!imageError[idx] && image.image_url ? (
                <Image
                  src={image.image_url}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                  onError={() => setImageError((prev) => ({ ...prev, [idx]: true }))}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[10px] text-primary/30 uppercase tracking-wider">Error</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal (Simplified for now) */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col">
          <div className="p-4 flex justify-end">
            <button
              onClick={() => setIsFullscreen(false)}
              className="text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-gold transition-colors p-2"
            >
              Close [X]
            </button>
          </div>
          <div className="flex-1 relative flex items-center justify-center p-4">
             {!imageError[activeIndex] && activeImage?.image_url && (
                <Image
                  src={activeImage.image_url}
                  alt={`${productName} - Fullscreen`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
             )}
          </div>
        </div>
      )}
    </div>
  );
}
