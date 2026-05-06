import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hydrelleskincare.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hydrelleskincare.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'pxarvstzsabmjpkzdgpd.supabase.co',
      },
    ],
  },
};

export default nextConfig;
