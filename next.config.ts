import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/v02",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
