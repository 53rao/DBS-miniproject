import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "2rck6md413.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
