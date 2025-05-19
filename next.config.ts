/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'lh3.googleusercontent.com'  // Add this line for Google user content
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000', 
        pathname: '/voitures/**',
      },
    ],
  },
};

export default nextConfig;