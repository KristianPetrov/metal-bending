import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/tools", destination: "/#tools", permanent: true },
      { source: "/order-now", destination: "/contact", permanent: true },
      { source: "/order-now/", destination: "/contact", permanent: true },
      { source: "/gallery-curved-metal-framing", destination: "/gallery?cat=curved-metal-framing", permanent: true },
      { source: "/gallery-copper-gutters", destination: "/gallery?cat=copper-gutters", permanent: true },
      { source: "/gallery-glass-glazing", destination: "/gallery?cat=glass-and-glazing", permanent: true },
      { source: "/gallery-curved-ceiling-components", destination: "/gallery?cat=curved-ceiling-components", permanent: true },
      { source: "/gallery-aerospace", destination: "/gallery?cat=aerospace", permanent: true },
      { source: "/gallery-miscellaneous", destination: "/gallery", permanent: true },
    ];
  },
};

export default nextConfig;
