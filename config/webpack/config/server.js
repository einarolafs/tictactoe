const webpack = require('webpack')

const paths = require('../paths')

module.exports = () => ({
  devServer: {
    contentBase: paths.contentBase,
    historyApiFallback: true,
    watchContentBase: true,
    host: '0.0.0.0',
    port: 3000,
    publicPath: '/',
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,
    inline: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
