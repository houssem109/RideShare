/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js now automatically supports path aliases 
  // defined in tsconfig.json, so you don't need to
  // configure them here anymore.
  
  // Other Next.js configuration options
  reactStrictMode: true,
  
  // Redirects configuration
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;