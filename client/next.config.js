const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  env: {
    SPOTTY_API_URL: process.env.SPOTTY_API_URL,
    SPOTTY_BASE_URL: process.env.SPOTTY_BASE_URL,
  },
});
