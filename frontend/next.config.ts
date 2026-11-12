import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // A lockfile in the home directory was being chosen as the workspace root.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
