import type { Config } from "@react-router/dev/config";

export default {
  // SPA mode (SSR disabled): run loaders/actions on the client so
  // network requests and console logs are visible in DevTools.
  ssr: false,
} satisfies Config;
