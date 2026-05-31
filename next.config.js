const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Necessario per GitHub Pages (dominio.github.io/spagna/)
  basePath: process.env.NODE_ENV === 'production' ? '/spagna' : '',
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: path.join(__dirname, './'),
};

module.exports = nextConfig;

