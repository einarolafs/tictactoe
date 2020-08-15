module.exports = ({ hot }) => {
  const entry = { app: [] }

  if (hot) {
    entry.app.push('react-hot-loader/patch')
  }

  entry.app.push('./src')

  return {
    entry,
  }
}
