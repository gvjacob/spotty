const withSass = require('@zeit/next-sass');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  env: {
    SPOTTY_API_URL: 'https://spotify-suggest.now.sh',
    SPOTTY_BASE_URL: 'https://spotty.now.sh',
  },
});
