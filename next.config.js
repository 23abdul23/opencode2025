/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export', // CRITICAL: Tells Next.js to generate static HTML/CSS/JS
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', 
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'scontent.fotp8-1.fna.fbcdn.net' },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;