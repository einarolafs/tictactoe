const merge = require('deepmerge')
// const util = require('util')

const plugins = require('./config/babel/plugins')
const presets = require('./config/babel/presets')

module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV)

  const config = merge(presets(api), plugins(api))

  return config
}
