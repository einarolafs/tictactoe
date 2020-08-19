const util = require('util')

const configure = require('./config/webpack/configure')

const config = configure()

console.log(`webpack.config.js=${util.inspect(config, { depth: null, colors: true })}`)

module.exports = config
