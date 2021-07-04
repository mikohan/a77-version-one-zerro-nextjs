module.exports = {
  images: {
    domains: ['localhost', 'picsum.photos', 'angara77.ru'],
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
