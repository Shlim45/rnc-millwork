/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'secure.img1-fg.wfcdn.com',
      'images.squarespace-cdn.com'
    ]
  },
}

module.exports = nextConfig
