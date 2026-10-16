/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site → export to `out/` for Cloudflare Pages (static hosting).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
