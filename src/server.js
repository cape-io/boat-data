import { get } from 'lodash'
import Hapi from 'hapi'
import { alarmDistance } from './position/actions'
import { getWaypointAlarmDistance } from './position/select'

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
    path: '/position/alarm/distance/{meters}',
    handler: (request, reply) => reply(store.dispatch(alarmDistance(request.params.meters))),
  })
  server.route({
    method: 'GET',
    path: '/position/alarm/waypoint/distance',
    handler: (request, reply) => reply(getWaypointAlarmDistance(store.getState().position)),
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
