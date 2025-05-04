import { withHydrationOverlay } from "@wayneintacart/react-hydration-overlay/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withHydrationOverlay()(nextConfig);
