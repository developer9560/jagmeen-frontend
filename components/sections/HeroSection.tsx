'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bannerApi, type Banner, type BannerType } from '@/lib/api';

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

const getBannerHref = (banner: Banner) => {
  if (banner.product_slug) return `/${banner.product_slug}`;
  if (banner.category_slug) return `/category/${banner.category_slug}`;
  return null;
};

interface HeroSectionProps {
  bannerType?: BannerType;
  initialBanners?: Banner[];
}

export default function HeroSection({ bannerType = 'HOME', initialBanners = [] }: HeroSectionProps) {
  const [slides, setSlides] = useState<Banner[]>(initialBanners);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(initialBanners.length === 0);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const resumeAutoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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
        let banners = initialBanners;
        if (banners.length === 0) {
          const response = await bannerApi.getByType(bannerType);
          banners = response.data?.banners ?? [];
        }
        if (!isMounted) return;

        setSlides(
          banners.filter((banner) =>
            isDesktop ? banner.is_for_desktop === true : banner.is_for_mobile === true
          )
        );
        setCurrentSlide(0);
      } catch (error) {
        console.error(`Failed to load ${bannerType} banners:`, error);
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
  }, [isDesktop, bannerType, initialBanners]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;

    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide(); // swiped left → next
      else prevSlide();          // swiped right → prev
    }

    touchStartX.current = null;
    touchEndX.current = null;
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
      className="object-contain transition-all duration-1000 ease-out"
      priority={safeCurrentSlide === 0}
      fetchPriority={safeCurrentSlide === 0 ? 'high' : 'auto'}
      quality={70}
      sizes="100vw"
    />
  );

  const getHeroLink = () => {
    switch (bannerType) {
      case "TRENDING":
        return "/trending";
      case "BESTSELLER":
        return "/best-sellers";
      default:
        return slideHref;
    }
  };

  const heroHref = getHeroLink();

  return (
    <section className="w-full ">
      <div className="w-full mx-auto relative group">

        {/* Image with touch support */}
        <div
          className="relative w-full h-200 sm:h-96 md:h-[850px] overflow-hidden bg-gray-200"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {heroHref ? (
            <Link href={heroHref} aria-label={slide.title}>
              {image}
            </Link>
          ) : (
            image
          )}
        </div>

        {/* Navigation Arrows — desktop only */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 group-hover:flex transition-all duration-300 p-3 rounded-full"
              aria-label="Previous slide"
            >
              <div className="relative w-6 h-6">
                {/* Black shadow arrow */}
                <ChevronLeft
                  className="absolute left-[1px] w-6 h-6"
                  color="white"
                />

                {/* White arrow */}
                <ChevronLeft
                  className="absolute  left-1 w-6 h-6"
                  color="black"
                />
              </div>
            </button>
            <button
              onClick={nextSlide}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20  group-hover:flex opacity-0 group-hover:opacity-100  transition-all duration-300 p-3 "
              aria-label="Next slide"
            >
              <div className="relative w-6 h-6">
                {/* Black shadow arrow */}
                <ChevronRight
                  className="absolute left-[1px] w-6 h-6"
                  color="black"
                />

                {/* White arrow */}
                <ChevronRight
                  className="absolute  left-1 w-6 h-6"
                  color="white"
                />
              </div>

            </button>
          </>
        )}

        {/* Slide Indicators - Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 flex">
            {slides.map((banner, index) => (
              <button
                key={banner.id}
                onClick={() => {
                  setCurrentSlide(index);
                  pauseAutoPlay();
                }}
                className="w-5 h-11 flex items-center justify-center"
                aria-label={`Go to ${banner.title}`}
              >
                <span
                  className={`block transition-all duration-300 rounded-full ${index === safeCurrentSlide
                      ? 'bg-white w-1 h-1 md:w-2 md:h-2'
                      : 'bg-white/50 w-1 h-1md:w-2 md:h-2 hover:bg-white/75'
                    }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
