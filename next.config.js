/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Se distribuito su GitHub Pages, decommenta la riga sotto
  // basePath: process.env.NODE_ENV === 'production' ? '/spagna' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
