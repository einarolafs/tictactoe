const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = require('../paths')

module.exports = () => ({
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          to: '.',
          context: paths.contentBase,
        },
      ],
    }),
  ],
})
