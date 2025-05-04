const {
  withHydrationOverlay,
} = require("@wayneintacart/react-hydration-overlay/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withHydrationOverlay()(nextConfig);
