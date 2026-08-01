import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/v01",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
