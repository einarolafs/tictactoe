const path = require('path')

module.exports = (options = {}) => ({
  resolve: {
    extensions: ['.js', 'ts', 'tsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/u, // eslint-disable-line prefer-named-capture-group
        exclude: /node_modules/u,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: options.ci ? false : path.join(process.cwd(), 'build/cache/babel'),
          },
        },
      },
    ],
  },
})
