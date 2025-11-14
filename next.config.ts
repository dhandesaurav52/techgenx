import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    turbo: true as any, // suppress TypeScript type error
  } as any,
};

export default nextConfig;
