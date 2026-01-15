const createNextIntlPlugin = require('next-intl/plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

module.exports = withNextIntl(nextConfig)
