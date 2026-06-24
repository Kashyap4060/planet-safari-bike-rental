import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Pin the file-tracing root to this project so a stray parent lockfile
  // doesn't get inferred as the workspace root.
  outputFileTracingRoot: process.cwd(),
}

export default nextConfig
