const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const sass = require('sass')

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.scss$/u,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:6]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.svg$/u,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      allChunks: true,
    }),
  ],
})
