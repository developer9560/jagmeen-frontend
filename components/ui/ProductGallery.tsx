'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const SCALE = 2.5; // zoom scale factor

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

  // Use refs for pan so wheel/drag handlers never capture stale values
  const panRef = useRef({ x: 0, y: 0 });
  const [panDisplay, setPanDisplay] = useState({ x: 0, y: 0 }); // triggers re-render

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panAtDragStart = useRef({ x: 0, y: 0 });
  const zoomed$ = useRef(false); // mirror of zoomed state for use inside closures

  const fullscreenRef = useRef<HTMLDivElement>(null);

  const activeImage = sortedImages[activeIndex];

  // ─── Clamp helper ──────────────────────────────────────────────────────────
  // When zoomed at SCALE, the image extends beyond viewport on each side by:
  // maxPan = (SCALE - 1) / 2 * viewportDimension
  // We keep pan within [-maxPan, maxPan] so the image edge never passes center.
  const clamp = useCallback((val: number, viewportDim: number) => {
    const maxPan = ((SCALE - 1) / 2) * viewportDim;
    return Math.max(-maxPan, Math.min(maxPan, val));
  }, []);

  const applyPan = useCallback(
    (rawX: number, rawY: number) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cx = clamp(rawX, vw);
      const cy = clamp(rawY, vh);
      panRef.current = { x: cx, y: cy };
      setPanDisplay({ x: cx, y: cy });
    },
    [clamp]
  );

  // ─── Reset ─────────────────────────────────────────────────────────────────
  const resetZoom = useCallback(() => {
    setZoomed(false);
    zoomed$.current = false;
    panRef.current = { x: 0, y: 0 };
    setPanDisplay({ x: 0, y: 0 });
  }, []);

  // ─── Navigation ────────────────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % sortedImages.length);
    resetZoom();
  }, [sortedImages.length, resetZoom]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
    resetZoom();
  }, [sortedImages.length, resetZoom]);

  // ─── Body scroll lock while fullscreen ─────────────────────────────────────
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  // ─── Non-passive wheel listener ────────────────────────────────────────────
  // React synthetic onWheel is passive — cannot call preventDefault().
  // We attach manually with { passive: false } to always block page scroll.
  useEffect(() => {
    const el = fullscreenRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // always block page scroll when fullscreen is open
      if (!zoomed$.current) return;
      const newX = panRef.current.x - e.deltaX * 0.4;
      const newY = panRef.current.y - e.deltaY * 0.4;
      applyPan(newX, newY);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [isFullscreen, applyPan]); // re-attach when fullscreen opens (ref becomes non-null)

  // ─── Click to zoom / unzoom ────────────────────────────────────────────────
  const handleImageClick = useCallback(() => {
    if (isDragging.current) return; // was a drag, not a click
    if (!zoomed$.current) {
      setZoomed(true);
      zoomed$.current = true;
      panRef.current = { x: 0, y: 0 };
      setPanDisplay({ x: 0, y: 0 });
    } else {
      resetZoom();
    }
  }, [resetZoom]);

  // ─── Mouse drag ────────────────────────────────────────────────────────────
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!zoomed$.current) return;
      e.preventDefault();
      isDragging.current = false;
      dragStart.current = { x: e.clientX, y: e.clientY };
      panAtDragStart.current = { ...panRef.current };

      const onMouseMove = (ev: MouseEvent) => {
        const dx = ev.clientX - dragStart.current.x;
        const dy = ev.clientY - dragStart.current.y;
        if (!isDragging.current && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
          isDragging.current = true;
        }
        applyPan(panAtDragStart.current.x + dx, panAtDragStart.current.y + dy);
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        setTimeout(() => { isDragging.current = false; }, 10);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [applyPan]
  );

  // ─── Touch drag ────────────────────────────────────────────────────────────
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!zoomed$.current) return;
      isDragging.current = false;
      const touch = e.touches[0];
      dragStart.current = { x: touch.clientX, y: touch.clientY };
      panAtDragStart.current = { ...panRef.current };

      const onTouchMove = (ev: TouchEvent) => {
        const t = ev.touches[0];
        const dx = t.clientX - dragStart.current.x;
        const dy = t.clientY - dragStart.current.y;
        if (!isDragging.current && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
          isDragging.current = true;
          ev.preventDefault();
        }
        applyPan(panAtDragStart.current.x + dx, panAtDragStart.current.y + dy);
      };

      const onTouchEnd = () => {
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        setTimeout(() => { isDragging.current = false; }, 10);
      };

      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);
    },
    [applyPan]
  );

  // ─── Keyboard: Escape closes fullscreen ────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        resetZoom();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFullscreen, resetZoom]);

  if (!sortedImages.length) {
    return (
      <div className="aspect-[3/4] md:aspect-square bg-cream flex flex-col items-center justify-center p-6 w-full h-full relative overflow-hidden group rounded-sm">
        <div className="w-24 h-32 border-2 border-gold/20 rounded-t-full rounded-b-lg opacity-40 mb-6" />
        <span className="font-heading italic text-primary/30 text-xl text-center">No Image Available</span>
      </div>
    );
  }

  // translate BEFORE scale so pan values are in screen pixels (intuitive 1:1 movement)
  const transformStyle = zoomed
    ? `translate(${panDisplay.x}px, ${panDisplay.y}px) scale(${SCALE})`
    : 'translate(0px, 0px) scale(1)';

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
            className="object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority
            onError={() => setImageError((prev) => ({ ...prev, [activeIndex]: true }))}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream/50">
            <span className="font-heading italic text-primary/30 text-lg">Image Unavailable</span>
          </div>
        )}
      </div>

      {/* ── Fullscreen Modal ─────────────────────────────────────────────────── */}
      {isFullscreen && (
        <div
          ref={fullscreenRef}
          className="fixed inset-0 z-[9999] bg-white"
          style={{ touchAction: 'none' }}
        >
          {/* Image container — overflow:hidden so image stays clipped to viewport */}
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
                  transform: transformStyle,
                  transition: isDragging.current ? 'none' : 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
                  transformOrigin: 'center center',
                  willChange: 'transform',
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

          {/* Hint */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-4 py-1.5 rounded-full pointer-events-none z-50 tracking-wider select-none">
            {zoomed ? 'Scroll / drag to pan • Click to zoom out' : 'Click to zoom in'}
          </div>

          {/* Controls */}
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

