/** @type {import('next').NextConfig} */
const nextConfig = {
  // Không dùng static export để có thể dùng API routes và rewrites
  distDir: '../matchCV_Project/wwwroot',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Rewrite để proxy API requests trong dev và production
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:5001/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig

