const { merge } = require('webpack-merge')

const assets = require('../config/assets')
const optimization = require('../config/optimization')
const stats = require('../config/stats')

const common = require('./common')

module.exports = (options = {}) => {
  process.env.NODE_ENV = 'production'

  const config = {
    bail: true,
    mode: 'production',
  }

  return merge(common(options), optimization(options), assets(options), stats(options), config)
}
