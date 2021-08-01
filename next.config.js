module.exports = {
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
  // async redirects() {
  //   return [
  //     {
  //       source: '/cat*',
  //       destination: '/temp/cat*', // Matched parameters can be used in the destination
  //       permanent: true,
  //     },
  //   ];
  // },
};
