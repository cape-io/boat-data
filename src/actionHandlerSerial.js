import { forEach } from 'lodash'
import { flow } from 'lodash/fp'
import PubSub from 'pubsub-js'
import sendMsg from './broadcast'
import { nextAction } from './utils'

export function sendAis(sentence, feeds) {
  if (feeds) forEach(feeds, ({ ip, port }) => sendMsg(sentence, ip, port))
}
export function sendUdpLan({ lanBroadcast, lanPort }, sentence) {
  if (lanPort) sendMsg(sentence, lanBroadcast, lanPort)
}
export function sendUdpNavionics({ lanBroadcast, navionicsPort }, sentence) {
  if (navionicsPort) sendMsg(sentence, lanBroadcast, navionicsPort)
}
export function sendUdp(config, { name, isAis, sentence }) {
  const { aisFeeds, lanBroadcast, wanBroadcast, wanPort } = config
  // Send data to local network.
  if (lanBroadcast) {
    sendUdpLan(config, sentence)
    // Send position information to Navionics.
    if (name === 'GPGGA') sendUdpNavionics(config, sentence) // EPIRB Wants This
    if (name === 'GPRMC') sendUdpNavionics(config, sentence)
    // if (name === 'GPGLL') // Latitude and Longitude
  }
  // Send data to wide network.
  // Proxy Server.
  if (wanBroadcast && wanPort) sendMsg(sentence, wanBroadcast, wanPort)
  // AIS services.
  if (aisFeeds && isAis) sendAis(sentence, aisFeeds)
}

// Sending off all AIS data.
export function handleSerialData({ action, store }) {
  if (action.payload) {
    sendUdp(store.getState().config, action.payload)
  } else {
    console.error(action)
  }
  PubSub.publish('serial', action.payload)
}

export default flow(
  nextAction,
  handleSerialData,
)
