import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        search: '',
      },
    ]
  },
};

export default nextConfig;
