module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.woff(?<v>2)?$/u,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
})
