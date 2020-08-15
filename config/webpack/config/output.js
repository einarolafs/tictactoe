const paths = require('../paths')

module.exports = () => ({
  output: {
    path: paths.outputPath,
    filename: '[name].[hash:8].js',
    publicPath: '/',
  },
})
