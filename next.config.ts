import type { NextConfig } from "next";

// Same-origin proxy target for the storefront API. The public key
// decides: a real `cpk_live_…` / `cpk_test_…` only resolves against
// hosted Cimplify, so browser cart writes go to the same place the
// server catalogue reads come from. Anything else (`mock-dev`, empty)
// falls back to the local `cimplify dev` mock in dev.
const publicKey = process.env.NEXT_PUBLIC_CIMPLIFY_PUBLIC_KEY?.trim() ?? "";
const keyTargetsHostedCimplify =
  publicKey.startsWith("cpk_live_") || publicKey.startsWith("cpk_test_");
const STOREFRONT_URL =
  process.env.NODE_ENV === "production" || keyTargetsHostedCimplify
    ? "https://storefronts.cimplify.io"
    : "http://127.0.0.1:8787";

if (STOREFRONT_URL === "http://127.0.0.1:8787") {
  console.warn(
    "[cimplify] next.config resolved the local storefront API URL; production deploys must run with NODE_ENV=production.",
  );
}

// Cache Components ('use cache' + cacheTag/cacheLife) require Node-specific
// setTimeout atomicity and serialize a postponed state that routinely exceeds
// CF Workers' 128MB zlib limit. We're on Cloudflare Workers via opennext, so
// we stay on Next 16's "Previous Model" — `fetch.next.{revalidate,tags}` via
// the SDK's `cacheOptions`, plus `export const revalidate` per page. See
// https://nextjs.org/docs/app/guides/caching-without-cache-components.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/login", destination: "/account", permanent: false },
      { source: "/signup", destination: "/account", permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: "/api/v1/:path*", destination: `${STOREFRONT_URL}/api/v1/:path*` },
      { source: "/img/:path*", destination: `${STOREFRONT_URL}/img/:path*` },
      { source: "/elements/:path*", destination: `${STOREFRONT_URL}/elements/:path*` },
      { source: "/_mock/:path*", destination: `${STOREFRONT_URL}/_mock/:path*` },
    ];
  },
  images: {
    loader: "custom",
    loaderFile: "./lib/cimplify-loader.ts",
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8787", pathname: "/img/**" },
      { protocol: "http", hostname: "localhost", port: "8787", pathname: "/img/**" },
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/img/**" },
      { protocol: "https", hostname: "loremflickr.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "static-tmp.cimplify.io", pathname: "/**" },
      { protocol: "https", hostname: "storefrontassetscdn.cimplify.io", pathname: "/**" },
      { protocol: "https", hostname: "cdn.cimplify.io", pathname: "/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/cimplify/**" },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/dcc5ggnkc/**" },
    ],
  },
};

export default nextConfig;
