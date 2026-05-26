const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/spagna' : '',
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
