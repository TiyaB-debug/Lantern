import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tells Next.js this folder is the project root, so it ignores stray lockfiles higher up.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
