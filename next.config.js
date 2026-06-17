const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.GITHUB_ACTIONS === 'true' ? 'export' : undefined,
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/spagna' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.GITHUB_ACTIONS === 'true' ? '/spagna' : '',
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.resolve(__dirname),
};

module.exports = nextConfig;

