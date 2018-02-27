import { forEach } from 'lodash'
import dgram from 'dgram'
import { InfluxDB } from 'influx'
import PubSub from 'pubsub-js'

const server = dgram.createSocket('udp4')
server.bind(() => {
  server.setBroadcast(true)
})

export const influx = new InfluxDB({
  host: 'localhost',
  database: 'boatdata',
})

export default function sendMsg(message, host, port) {
  const data = Buffer.from(message)
  server.send(data, 0, data.length, port, host, (err) => {
    if (err) throw err
    // console.log(message, host, port)
  })
}

export function sendAis(sentence, feeds) {
  if (feeds) forEach(feeds, ({ ip, port }) => sendMsg(sentence, ip, port))
}
export function sendUdpLan({ lanBroadcast, lanPort }, sentence) {
  if (lanPort) sendMsg(sentence, lanBroadcast, lanPort)
}
export function sendUdpNavionics({ lanBroadcast, navionicsPort }, sentence) {
  if (navionicsPort) sendMsg(sentence, lanBroadcast, navionicsPort)
}
// Send some over network.
export function sendUdp(config, { name, isAis, sentence }) {
  const { aisFeeds, lanBroadcast, wanBroadcast, wanPort } = config
  // Send data to local network.
  if (lanBroadcast) {
    sendUdpLan(config, sentence)
    // Send position information to Navionics.
    if (name === 'GPGGA') sendUdpNavionics(config, sentence) // EPIRB Wants This
    if (name === 'GPRMC') sendUdpNavionics(config, sentence)
    // if (name === 'GPGLL') // Latitude and Longitude
    PubSub.publish('serial', { sentence })
  }
  // Send data to wide network.
  // Proxy Server.
  if (wanBroadcast && wanPort) sendMsg(sentence, wanBroadcast, wanPort)
  // AIS services.
  if (aisFeeds && isAis) sendAis(sentence, aisFeeds)
}
