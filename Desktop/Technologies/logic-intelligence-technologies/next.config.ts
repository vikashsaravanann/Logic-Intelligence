import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Logic-Intelligence',
  trailingSlash: true,
  assetPrefix: '/Logic-Intelligence/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
