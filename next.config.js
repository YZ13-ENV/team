const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
})
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*'
            }
        ]
    },
    experimental: {
        optimizeCss: true,
        optimizeServerReact: true
    }
};
module.exports = withBundleAnalyzer(nextConfig)