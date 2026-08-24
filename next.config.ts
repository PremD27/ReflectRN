import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      // Correct TypeScript nesting for Server Actions
      allowedOrigins: ['*.ngrok-free.app', 'localhost:3000'],
    },
  },
};

export default nextConfig;
