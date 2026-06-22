import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      }
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
