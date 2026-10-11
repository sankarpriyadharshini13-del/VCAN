/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true
  },
  output: 'export',
  trailingSlash: true
};
export default nextConfig;
