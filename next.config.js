/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [process.env.OBJECT_STORAGE_URL]
  }
}

module.exports = nextConfig
