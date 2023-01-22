/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [ 360, 640, 1080, 1920],
    imageSizes:  [ 32, 64, 128, 256],
  },
}

module.exports = nextConfig
