
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
      },
      {
        protocol: 'https',
        hostname: 'i.ebayimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com', // Added for Destined Rivals pack image
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bananagames.ca', // Added for new Generations pack image
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
