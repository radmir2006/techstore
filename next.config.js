/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force rebuild - version 2.0
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Disable caching for development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
