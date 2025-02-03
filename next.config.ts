import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "ucarecdn.com" },
      { hostname: "img.clerk.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/api/:path*", // Apply CORS to all API routes
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Allow all origins (change in production)
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default nextConfig;
