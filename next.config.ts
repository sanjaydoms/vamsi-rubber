import type { NextConfig } from "next";

const isPort3001 = process.argv.includes("3001");

const nextConfig: NextConfig = {
  distDir: isPort3001 ? ".next-3001" : ".next",
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: false,
  },
};

export default nextConfig;
