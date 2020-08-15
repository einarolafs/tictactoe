const { merge } = require('webpack-merge')

const loaders = require('../loaders')
const entry = require('../config/entry')
const html = require('../config/html')
const node = require('../config/node')
const output = require('../config/output')
const resolve = require('../config/resolve')
const sourceMaps = require('../config/source-maps')
const vars = require('../config/vars')

module.exports = (options) =>
  merge(
    entry(options),
    sourceMaps(),
    resolve(),
    loaders.jsLoader(options),
    loaders.scssLoader(),
    loaders.imageLoader(),
    loaders.fontLoader(),
    vars(),
    output(),
    html(),
    node()
  )
