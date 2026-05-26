const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/spagna',
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
