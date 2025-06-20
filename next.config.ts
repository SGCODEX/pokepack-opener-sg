
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
        hostname: 'pbs.twimg.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bananagames.ca', 
        pathname: '/**',
      },
      { // Added for Firebase Storage (user profile pictures)
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
