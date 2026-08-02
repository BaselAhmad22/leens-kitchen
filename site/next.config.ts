import type { NextConfig } from "next";

const contentApi = process.env.CONTENT_API_URL?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "standalone",
  images: contentApi
    ? {
        loader: "custom",
        loaderFile: "./image-loader.ts",
        unoptimized: true,
      }
    : undefined,
  async rewrites() {
    if (!contentApi) return [];
    return [
      {
        source: "/images/:path*",
        destination: `${contentApi}/api/media-file/:path*`,
      },
    ];
  },
};

export default nextConfig;
