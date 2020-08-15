const path = require('path')

module.exports = {
  outputPath: path.join(process.cwd(), 'build/app'),
  contentBase: path.join(process.cwd(), 'public'),
}
