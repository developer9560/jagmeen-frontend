'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [zoomed, setZoomed] = useState(false);

  // Pan state
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });

  const activeImage = sortedImages[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % sortedImages.length);
    resetZoom();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
    resetZoom();
  };

  const resetZoom = () => {
    setZoomed(false);
    setPanX(0);
    setPanY(0);
  };

  const handleImageClick = useCallback(
    (e: React.MouseEvent) => {
      // If we were dragging, don't toggle zoom
      if (isDragging.current) return;
      if (!zoomed) {
        setZoomed(true);
        setPanX(0);
        setPanY(0);
      } else {
        resetZoom();
      }
    },
    [zoomed]
  );

  // Mouse drag handlers
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!zoomed) return;
      isDragging.current = false;
      dragStart.current = { x: e.clientX, y: e.clientY };
      panStart.current = { x: panX, y: panY };

      const onMouseMove = (ev: MouseEvent) => {
        const dx = ev.clientX - dragStart.current.x;
        const dy = ev.clientY - dragStart.current.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          isDragging.current = true;
        }
        setPanX(panStart.current.x + dx);
        setPanY(panStart.current.y + dy);
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        // Reset drag flag after short delay so click handler can check it
        setTimeout(() => { isDragging.current = false; }, 10);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [zoomed, panX, panY]
  );

  // Touch drag handlers
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!zoomed) return;
      isDragging.current = false;
      const touch = e.touches[0];
      dragStart.current = { x: touch.clientX, y: touch.clientY };
      panStart.current = { x: panX, y: panY };

      const onTouchMove = (ev: TouchEvent) => {
        const t = ev.touches[0];
        const dx = t.clientX - dragStart.current.x;
        const dy = t.clientY - dragStart.current.y;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          isDragging.current = true;
          ev.preventDefault();
        }
        setPanX(panStart.current.x + dx);
        setPanY(panStart.current.y + dy);
      };

      const onTouchEnd = () => {
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        setTimeout(() => { isDragging.current = false; }, 10);
      };

      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    },
    [zoomed, panX, panY]
  );

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
      {/* Thumbnails */}
      {sortedImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto overflow-x-hidden md:w-14 lg:w-18 flex-shrink-0 scrollbar-hide order-2 md:order-1">
          {sortedImages.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-24 sm:w-24 sm:h-32 md:w-full md:h-auto md:aspect-[3/4] flex-shrink-0 bg-cream overflow-hidden transition-all duration-300 ${
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

      {/* Fullscreen Modal with Pan-to-Move */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-center items-center">
          {!imageError[activeIndex] && activeImage?.image_url && (
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ cursor: zoomed ? (isDragging.current ? 'grabbing' : 'grab') : 'zoom-in' }}
              onClick={handleImageClick}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: zoomed
                    ? `scale(2.5) translate(${panX / 2.5}px, ${panY / 2.5}px)`
                    : 'scale(1) translate(0px, 0px)',
                  transition: isDragging.current ? 'none' : 'transform 0.4s ease-out',
                  transformOrigin: 'center center',
                }}
              >
                <Image
                  src={activeImage.image_url}
                  alt={`${productName} full product image - Jagmeen Fashion`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>
          )}

          {/* Hint text */}
          {zoomed && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none z-50 tracking-wider">
              Drag to move • Click to zoom out
            </div>
          )}

          {/* Controls - Bottom Center */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
            {sortedImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="w-12 h-12 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all shadow-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
            )}

            <button
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); resetZoom(); }}
              className="w-16 h-16 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all shadow-sm"
              aria-label="Close fullscreen"
            >
              <X size={30} strokeWidth={1} />
            </button>

            {sortedImages.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
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
