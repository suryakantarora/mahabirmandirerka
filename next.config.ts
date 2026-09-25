import type { NextConfig } from "next";

if (
  process.env.NODE_ENV === "production" &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  console.warn(
    "\n⚠  NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, Open Graph images and the sitemap will point to https://example.com.\n",
  );
}

const config: NextConfig = {
  turbopack: { root: process.cwd() },
  devIndicators: false,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default config;
