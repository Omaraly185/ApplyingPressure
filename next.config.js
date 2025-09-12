/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,


  // Enable SASS support
  sassOptions: {
    includePaths: ['./src'],
  },

  // Image optimization
  images: {
    domains: ['applyingpressure-api-production.up.railway.app'],
    formats: ['image/webp', 'image/avif'],
  },

  // Redirects for SEO - removed to prevent redirect loops
  // async redirects() {
  //   return [];
  // },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },


};

module.exports = nextConfig;
