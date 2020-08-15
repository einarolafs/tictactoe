const { merge } = require('webpack-merge')

const server = require('../config/server')

const common = require('./common')

module.exports = (options = {}) => {
  process.env.NODE_ENV = 'development'

  const config = {
    mode: 'development',
  }

  return merge(common(options), server(options), config)
}
