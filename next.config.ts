import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["iyzipay"],

  experimental: {
    serverComponentsExternalPackages: ["iyzipay"],
  },
};

export default nextConfig;
