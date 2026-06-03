const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Necessario per GitHub Pages (dominio.github.io/spagna/)
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/spagna' : '',
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.resolve(__dirname),
};

module.exports = nextConfig;

