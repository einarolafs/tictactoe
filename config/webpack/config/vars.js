const webpack = require('webpack')

const environment = require('../../environment')

module.exports = () => {
  const vars = {
    ENVIRONMENT: JSON.stringify(environment),
  }

  return {
    plugins: [new webpack.DefinePlugin(vars), new webpack.EnvironmentPlugin(['NODE_ENV'])],
  }
}
