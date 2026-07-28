'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

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
  const [zoomed, setZoomed] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % sortedImages.length);
    setZoomed(false);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
    setZoomed(false);
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
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 h-full">
      {/* Thumbnails - Vertical on Desktop, Horizontal on Mobile */}
      {sortedImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto overflow-x-hidden md:w-14 lg:w-18 flex-shrink-0 scrollbar-hide order-2 md:order-1">
          {sortedImages.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-24 sm:w-24 sm:h-32 md:w-full md:h-auto md:aspect-[3/4] flex-shrink-0 bg-cream overflow-hidden  transition-all duration-300 ${
                idx === activeIndex
                  ? 'border-2 border-black ring-offset-2 opacity-100'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              {!imageError[idx] && image.image_url ? (
                <Image
                  src={image.image_url}
                  alt={`${productName} thumbnail image ${idx + 1} - Jagmeen Fashion`}
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

      {/* Main Image */}
      <div 
        className="relative w-full aspect-[3/4] md:aspect-auto md:h-[600px] lg:h-[750px] bg-cream overflow-hidden group cursor-[url('/plus.png')_24_24,_zoom-in] order-1 md:order-2"
        onClick={() => setIsFullscreen(true)}
      >
        {!imageError[activeIndex] && activeImage?.image_url ? (
          <Image
            src={activeImage.image_url}
            alt={`${productName} product image ${activeIndex + 1} - Jagmeen Fashion`}
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
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-center items-center">
          <div className="absolute inset-0 flex items-center justify-center">
            {!imageError[activeIndex] && activeImage?.image_url && (
              <div 
                className={`relative w-full h-full overflow-hidden cursor-${zoomed ? 'zoom-out' : 'zoom-in'}`}
                onClick={() => setZoomed((prev) => !prev)}
              >
                <Image
                  src={activeImage.image_url}
                  alt={`${productName} full product image - Jagmeen Fashion`}
                  fill
                  className={`object-contain transition-transform duration-500 ease-out ${zoomed ? 'scale-[2.5]' : 'scale-100'}`}
                  sizes="100vw"
                  priority
                />
              </div>
            )}
          </div>
          
          {/* Controls - Bottom Center */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
            {sortedImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="w-12 h-12 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all shadow-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="w-16 h-16 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all shadow-sm"
              aria-label="Close fullscreen"
            >
              <X size={30} strokeWidth={1} />
            </button>
            
            {sortedImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="w-12 h-12 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all shadow-sm"
                aria-label="Next image"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
