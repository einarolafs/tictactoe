const build = require('./targets/build')
const start = require('./targets/start')

module.exports = () => {
  const options = {
    ci: Boolean(process.env.CI),
  }

  const npmEvent = process.env.npm_lifecycle_event

  if (npmEvent.includes('build')) {
    return build({
      ...options,
      stats: true,
    })
  }

  return start({
    ...options,
    hot: true,
  })
}
