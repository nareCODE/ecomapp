/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com', // Added based on product.thumbnail in Navbar.tsx
        port: '',
        pathname: '/**',
      },
      // Add any other hostnames your application uses for images here
    ],
  },
  // ... any other configurations you might have
};

module.exports = nextConfig;
