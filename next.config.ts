import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  outputFileTracingRoot: path.resolve(process.cwd()),
};

export default nextConfig;

