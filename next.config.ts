import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    cpus: 1,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
