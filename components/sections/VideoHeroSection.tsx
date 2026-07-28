'use client';

import React, { useState, useEffect } from 'react';

interface VideoData {
  id: number;
  title: string;
  video_url: string;
  is_active: boolean;
  is_for_desktop: boolean;
  is_for_mobile: boolean;
}

interface VideoHeroSectionProps {
  videos: VideoData[];
}

/** Detect URL type and return the correct embed/src */
function resolveVideoSource(url: string): { type: 'youtube' | 'cloudinary-embed' | 'direct'; src: string } {
  if (!url) return { type: 'direct', src: '' };

  // YouTube short link: youtu.be/ID
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return {
      type: 'youtube',
      src: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&playsinline=1`,
    };
  }

  // YouTube Shorts: youtube.com/shorts/ID
  if (url.includes('youtube.com/shorts/')) {
    const videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0];
    return {
      type: 'youtube',
      src: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&playsinline=1`,
    };
  }

  // YouTube long link: youtube.com/watch?v=ID
  if (url.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const videoId = urlParams.get('v') || '';
    return {
      type: 'youtube',
      src: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&playsinline=1`,
    };
  }

  // YouTube embed link already
  if (url.includes('youtube.com/embed/')) {
    const videoId = url.split('youtube.com/embed/')[1]?.split('?')[0];
    return {
      type: 'youtube',
      src: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&playsinline=1`,
    };
  }

  // Cloudinary player embed URL
  if (url.includes('player.cloudinary.com/embed')) {
    const urlObj = new URL(url);
    const cloudName = urlObj.searchParams.get('cloud_name') || '';
    const publicId = urlObj.searchParams.get('public_id') || '';
    const embedUrl = `https://player.cloudinary.com/embed/?cloud_name=${cloudName}&public_id=${publicId}&autoplay=true&muted=true&loop=true&autopause=false`;
    return { type: 'cloudinary-embed', src: embedUrl };
  }

  // Cloudinary raw video resource (res.cloudinary.com) — direct video file
  if (url.includes('res.cloudinary.com')) {
    return { type: 'direct', src: url };
  }

  // Fallback: treat as direct video file
  return { type: 'direct', src: url };
}

export default function VideoHeroSection({ videos }: VideoHeroSectionProps) {
  // null = not detected yet (avoid hydration mismatch)
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Don't render anything until we know the device size (avoids flash)
  if (isMobile === null || !videos || videos.length === 0) return null;

  // Pick the right video for the current device
  const video = isMobile
    ? videos.find((v) => v.is_for_mobile)   // mobile: pick a video flagged for mobile
    : videos.find((v) => v.is_for_desktop); // desktop: pick a video flagged for desktop

  // No matching video for this device → hide the section completely
  if (!video) return null;

  const resolved = resolveVideoSource(video.video_url);
  const isEmbed = resolved.type === 'youtube' || resolved.type === 'cloudinary-embed';

  return (
    <section className="relative w-full h-[100svh] md:h-[calc(100vh-80px)] overflow-hidden bg-black">
      {isEmbed ? (
        /* iframe for YouTube & Cloudinary embed URLs — pointer-events-none so iframe doesn't capture input */
        <div className="absolute top-1/2 left-1/2 w-[350vw] h-[300vh] md:w-[150vw] md:h-[150vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          <iframe
            src={resolved.src}
            allow="autoplay; encrypted-media"
            className="w-full h-full border-0"
            title={video.title}
          />
        </div>
      ) : (
        /* Direct video file (mp4, webm, etc.) */
        <video
          src={resolved.src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay: sits above the iframe, blocks ALL pointer events so YouTube/Cloudinary controls are inaccessible */}
      <div className="absolute inset-0 bg-black/10 z-10 cursor-default" />

      {/* Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center pb-24 md:pb-0 p-4 text-center pointer-events-none z-20">
        {video.title && video.title.trim().length > 1 && (
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-widest drop-shadow-lg opacity-90">
            {video.title}
          </h1>
        )}
      </div>
    </section>
  );
}
