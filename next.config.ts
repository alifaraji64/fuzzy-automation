import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: "images.unsplash.com",
    },
    { hostname: "ucarecdn.com" }]
  }
};

export default nextConfig;
