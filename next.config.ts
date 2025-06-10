
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
        hostname: 'den-cards.pokellector.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'product-images.tcgplayer.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'loosepacks.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.tradera.net',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
