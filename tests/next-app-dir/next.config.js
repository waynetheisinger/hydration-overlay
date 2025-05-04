const {
  withHydrationOverlay,
} = require("@wayneintacart/react-hydration-overlay/next");

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withHydrationOverlay({
  appRootSelector: "main",
})(nextConfig);
