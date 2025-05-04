import "@/styles/globals.css";
import { HydrationOverlay } from "@wayneintacart/react-hydration-overlay";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HydrationOverlay>
      <Component {...pageProps} />
    </HydrationOverlay>
  );
}
