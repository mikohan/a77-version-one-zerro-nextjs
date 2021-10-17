const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
  images: {
    domains: [
      'localhost',
      'picsum.photos',
      'angara77.ru',
      'angara77.ml',
      'angara77.com',
    ],
  },
  crossOrigin: 'anonymous',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  productionBrowserSourceMaps: true,
});
