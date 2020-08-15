const devtool = (env) => {
  switch (env) {
    case 'production':
      return 'source-map'
    case 'test':
      return false
    default:
      // use 'eval-source-map' if you want to debug IE11
      return 'cheap-module-source-map'
  }
}

module.exports = () => ({
  devtool: devtool(process.env.NODE_ENV),
})
