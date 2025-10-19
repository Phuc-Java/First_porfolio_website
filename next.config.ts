import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Enable optimized page transitions
    optimizePackageImports: ['framer-motion', 'motion/react'],
  },
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  
  // Webpack configuration for Three.js and 3D assets
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;
