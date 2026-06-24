'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bannerApi, type Banner } from '@/lib/api';

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

const getBannerHref = (banner: Banner) => {
  if (banner.product_slug) return `/products/${banner.product_slug}`;
  if (banner.category_slug) return `/category/${banner.category_slug}`;
  return null;
};

export default function HeroSection() {
  const [slides, setSlides] = useState<Banner[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const resumeAutoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const updateDeviceType = () => setIsDesktop(mediaQuery.matches);

    updateDeviceType();
    mediaQuery.addEventListener('change', updateDeviceType);

    return () => {
      mediaQuery.removeEventListener('change', updateDeviceType);
    };
  }, []);

  useEffect(() => {
    if (isDesktop === null) return;

    let isMounted = true;

    const loadBanners = async () => {
      setIsLoading(true);

      try {
        const response = isDesktop
          ? await bannerApi.getDesktop()
          : await bannerApi.getMobile();
        if (!isMounted) return;

        const banners = response.data?.banners ?? [];
        setSlides(
          banners.filter((banner) =>
            isDesktop ? banner.is_for_desktop === true : banner.is_for_mobile === true
          )
        );
        setCurrentSlide(0);
      } catch (error) {
        console.error('Failed to load hero banners:', error);
        if (isMounted) {
          setSlides([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadBanners();

    return () => {
      isMounted = false;
    };
  }, [isDesktop]);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlay || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, slides.length]);

  useEffect(() => {
    return () => {
      if (resumeAutoPlayTimer.current) {
        clearTimeout(resumeAutoPlayTimer.current);
      }
    };
  }, []);

  const pauseAutoPlay = () => {
    setIsAutoPlay(false);

    if (resumeAutoPlayTimer.current) {
      clearTimeout(resumeAutoPlayTimer.current);
    }

    resumeAutoPlayTimer.current = setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    if (slides.length <= 1) return;

    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAutoPlay();
  };

  const prevSlide = () => {
    if (slides.length <= 1) return;

    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAutoPlay();
  };

  const safeCurrentSlide = slides.length ? Math.min(currentSlide, slides.length - 1) : 0;
  const slide = slides[safeCurrentSlide];
  const slideHref = slide ? getBannerHref(slide) : null;

  if (isLoading) {
    return (
      <section className="w-full px-4 md:px-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative w-full h-64 sm:h-96 md:h-[500px] overflow-hidden rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!slide) {
    return null;
  }

  const image = (
    <Image
      src={slide.image_url}
      alt={slide.title}
      fill
      className="object-cover transition-all duration-1000 ease-out"
      priority={safeCurrentSlide === 0}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
    />
  );

  return (
    <section className="w-full px-4 md:px-0 ">
      {/* Image Slider Container - Centered */}
      <div className="w-full  mx-auto relative">
        {/* Image */}
        <div className="relative w-full h-64 sm:h-96 md:h-[550px] overflow-hidden  bg-gray-200">
          {slideHref ? (
            <Link href={slideHref} aria-label={slide.title}>
              {image}
            </Link>
          ) : (
            image
          )}
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/40 hover:bg-white/70 transition-all duration-300 p-2 md:p-3 text-white backdrop-blur-sm rounded-full group"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/40 hover:bg-white/70 transition-all duration-300 p-2 md:p-3 text-white backdrop-blur-sm rounded-full group"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {/* Slide Indicators - Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((banner, index) => (
              <button
                key={banner.id}
                onClick={() => {
                  setCurrentSlide(index);
                  pauseAutoPlay();
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === safeCurrentSlide
                    ? 'bg-white w-6 h-2'
                    : 'bg-white/50 w-2 h-2 hover:bg-white/75'
                }`}
                aria-label={`Go to ${banner.title}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
