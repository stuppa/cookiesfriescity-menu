import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: { formats: ["image/avif", "image/webp"] },
  // CSS inline en el <head>: la mayoría llega por QR (primera visita), así evitamos un request que bloquea el render.
  experimental: { inlineCss: true },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
