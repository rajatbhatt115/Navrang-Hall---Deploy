const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./data/db.json')
const middlewares = jsonServer.defaults()
const cors = require('cors')

server.use(cors())
server.use(middlewares)
server.use(jsonServer.bodyParser)

// Custom routes if needed
server.use('/api', router)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})