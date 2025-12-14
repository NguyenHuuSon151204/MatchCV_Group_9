/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  // Set turbopack root to silence warning about multiple lockfiles
  experimental: {
    turbo: {
      root: process.cwd(),
    },
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/app/dashboard',
        permanent: true,
      },
      {
        source: '/my-cvs',
        destination: '/app/my-cvs',
        permanent: true,
      },
      {
        source: '/jd-analyzer',
        destination: '/app/jd-analyzer',
        permanent: true,
      },
      {
        source: '/ai-rewrite',
        destination: '/app/ai-rewrite',
        permanent: true,
      },
      {
        source: '/export',
        destination: '/app/export',
        permanent: true,
      },
      {
        source: '/settings',
        destination: '/app/settings',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/app/jobs',
        permanent: true,
      },
      {
        source: '/post-job',
        destination: '/app/post-job',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5185/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig

