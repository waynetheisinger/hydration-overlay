import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { withHydrationOverlayVite } from "@builder.io/react-hydration-overlay/vite";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    withHydrationOverlayVite({
      appRootSelector: "body",          // your root
      entry: /entry\.client\.([tj])sx?$/ // your client entry(s)
    }),
    tsconfigPaths(),
  ],
});
