import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: "images.unsplash.com",
    },
    { hostname: "ucarecdn.com" },
    {hostname:'img.clerk.com'}
  ]
  }
};

export default nextConfig;
