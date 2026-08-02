import type { NextConfig } from "next";

const basePath = process.env.ADMIN_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: basePath || undefined,
};

export default nextConfig;
