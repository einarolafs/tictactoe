const merge = require('deepmerge')

const defaults = require('./defaults')
const development = require('./development')

/* const configure = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return development

    case 'test':
      return test

    default:
      switch (branch) {
        case 'master':
          return production

        case 'release':
          return preprod

        case 'staging':
          return staging

        default:
          return development
      }
  }
} */

module.exports = merge(defaults, development)
