/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,


  
  // Enable SASS support
  sassOptions: {
    includePaths: ['./src'],
  },

  // Image optimization
  images: {
    domains: ['applyingpressure-api-production.up.railway.app'],
    formats: ['image/webp', 'image/avif'],
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/book-now',
        destination: '/Book_Now',
        permanent: true,
      },
      {
        source: '/Ceramic-Coating',
        destination: '/ceramic-coating',
        permanent: true,
      },
      {
        source: '/ContactUs',
        destination: '/contactus',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contactus',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/privacy-policy',
        permanent: false,
      },
      {
        source: '/terms-conditions',
        destination: '/terms-conditions',
        permanent: false,
      },
    ];
  },

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
