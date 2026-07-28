import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: blob: https:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https://api.jagmeenfashion.com https://res.cloudinary.com https:; form-action 'self'; media-src 'self' blob: https://res.cloudinary.com https://player.cloudinary.com https://*.cloudinary.com https://www.youtube.com https://youtu.be https://*.youtube.com; frame-src 'self' https://www.youtube.com https://youtube.com https://player.cloudinary.com https://*.cloudinary.com; upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
      {
        protocol: "https",
        hostname:"thehiranya.com"
      },
      {
        protocol:"https",
        hostname:"houseofniav.com"
      },
      {
        protocol:"https",
        hostname:"drive.google.com"
      },{
        protocol:"https",
        hostname:"youtube.com"
      },{
        protocol:"https",
        hostname:"youtu.be"
      },
      {
        protocol:"https",
        hostname:"www.youtube.com"
      }
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
