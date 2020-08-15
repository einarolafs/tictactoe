const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/cards', (req, res) => {
  const file = fs.readFileSync(path.join(__dirname, 'cards.json'))

  res.jsonp(JSON.parse(file))
})

server.use(jsonServer.bodyParser)

// Use default router
server.use(router)
server.listen(8000, () => {
  console.log('JSON Server is running port 8000')
})
