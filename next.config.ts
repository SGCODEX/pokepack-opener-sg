
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pokellector.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'product-images.tcgplayer.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
