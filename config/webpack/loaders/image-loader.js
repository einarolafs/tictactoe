module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(?<ext>png|jpg|gif)$/u,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
})
