import { forEach } from 'lodash'
import { flow } from 'lodash/fp'
import PubSub from 'pubsub-js'
import sendMsg from './broadcast'
import { nextAction } from './utils'

export function sendAis(sentence, feeds) {
  if (feeds) forEach(feeds, ({ ip, port }) => sendMsg(sentence, ip, port))
}
export function sendUdp(config, sentence) {
  const { lanBroadcast, lanPort, wanBroadcast, wanPort } = config
  if (lanBroadcast && lanPort) sendMsg(sentence, lanBroadcast, lanPort)
  if (wanBroadcast && wanPort) sendMsg(sentence, wanBroadcast, wanPort)
}
// Sending off all AIS data.
export function handleSerialData({ action, store }) {
  const state = store.getState()
  const { aisFeeds } = state.config
  if (action.payload.isAis) sendAis(action.payload.sentence, aisFeeds)
  sendUdp(state.config, action.payload.sentence)
  PubSub.publish('serial', action.payload)
}
export default flow(
  nextAction,
  handleSerialData,
)
