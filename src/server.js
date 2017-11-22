import { get, mapValues } from 'lodash'
import Hapi from 'hapi'
import { alarmDistance, waypointUpdate } from './position/actions'
import { getWaypointDistance } from './position/select'
import { getPgnSrc } from './data/select'

const serverOptions = {
  debug: { request: ['error'] },
}
const server = new Hapi.Server(serverOptions)
server.connection({
  port: 3001,
  routes: { cors: true },
})
export default function init(store) {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => reply(store.getState()),
  })
  server.route({
    method: 'GET',
    path: '/data/pgn',
    handler: (request, reply) => reply(getPgnSrc(store.getState())),
  })
  // server.route({
  //   method: 'GET',
  //   path: '/data/pgn/{pgn}',
  //   handler: (request, reply) => reply(getPgnSrc(store.getState())),
  // })
  server.route({
    method: 'GET',
    path: '/position/alarm/distance/{meters}',
    handler: (request, reply) =>
      reply(store.dispatch(alarmDistance(parseInt(request.params.meters, 10)))),
  })
  server.route({
    method: 'GET',
    path: '/position/waypoint/distance',
    handler: (request, reply) => reply(getWaypointDistance(store.getState().position)),
  })
  server.route({
    method: 'GET',
    path: '/position/waypoint/{latitude}/{longitude}',
    handler: (request, reply) =>
      reply(store.dispatch(waypointUpdate(mapValues(request.params, parseFloat)))),
  })
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: (request, reply) => reply(get(store.getState(), request.params.path.split('/'))),
  })
  server.start((err) => {
    if (err) { throw err }
    console.log('Server running at:', server.info.uri)
  })
}
