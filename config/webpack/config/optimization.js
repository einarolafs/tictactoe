const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = () => ({
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            toplevel: true,
          },
          mangle: {
            toplevel: true,
          },
          output: {
            beautify: false,
          },
        },
        sourceMap: true,
        parallel: true,
        cache: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
})
