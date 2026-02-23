/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin images from common CDN/asset hosts
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.thecashflowacademy.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Enforce strict mode for React
  reactStrictMode: true,
};

export default nextConfig;
