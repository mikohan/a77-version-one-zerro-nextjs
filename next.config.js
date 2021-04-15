module.exports = {
  images: {
    domains: ['localhost', 'picsum'],
  },
  crossOrigin: 'anonymous',
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
