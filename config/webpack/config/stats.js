const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (options) => {
  if (options.stats) {
    return {
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: '../report/stats.html',
          statsFilename: '../report/stats.json',
          defaultSizes: 'gzip',
          generateStatsFile: true,
          openAnalyzer: !options.ci,
        }),
      ],
    }
  }

  return {}
}
