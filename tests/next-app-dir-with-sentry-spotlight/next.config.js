// @ts-ignore
const {
  withHydrationOverlay,
} = require("@wayneintacart/react-hydration-overlay/next");
const WebpackHookPlugin = require("webpack-hook-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config,
    { dev, isServer, nextRuntime }) => {
    if (dev && isServer && nextRuntime === 'nodejs') {
      const newConfig = { ...config };
      newConfig.plugins.push(new WebpackHookPlugin({
        onBuildStart: ['npx @spotlightjs/spotlight'],
      }));
      return newConfig;
    }
    return config;
  },
};

module.exports = withHydrationOverlay({
  appRootSelector: "main",
})(nextConfig);


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "shubhdeep-chhabra",
    project: "shubhdeepchhabra",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
