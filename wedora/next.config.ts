import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sxutxqfwyxzlgsnvonvr.supabase.co",
        pathname: "/storage/v1/object/public/**", // Preciznija putanja za Supabase storage
      },
    ],
  },
};

export default nextConfig;