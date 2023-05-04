/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true
    }
    return config
  },
  experimental: {
    appDir: true,
    mdxRs: true,
  },
}

const withMDX = require('@next/mdx')()
module.exports = withMDX(nextConfig)
