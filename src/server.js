import Hapi from 'hapi'

const serverOptions = {
  debug: { request: ['error'] },
}
const server = new Hapi.Server(serverOptions)
server.connection({
  host: 'localhost',
  port: 8000,
  routes: { cors: true },
})
export default function init(store) {
  server.route({
    method: 'GET',
    path: '/state',
    handler: (request, reply) => reply(store.getState()),
  })
  server.start((err) => {
    if (err) { throw err }
    console.log('Server running at:', server.info.uri)
  })
}
