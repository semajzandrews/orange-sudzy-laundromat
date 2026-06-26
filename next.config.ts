import type { NextConfig } from "next";

// Static export. For LOCAL review the site is served under a subpath
// (/<folder>/out) on the shared server, so /_next/* assets need an assetPrefix
// or CSS+JS 404. That prefix is set ONLY via REVIEW_PREFIX at review-build time.
// Vercel builds with REVIEW_PREFIX unset → root-absolute paths → correct in prod.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(process.env.REVIEW_PREFIX ? { assetPrefix: process.env.REVIEW_PREFIX } : {}),
};

export default nextConfig;
