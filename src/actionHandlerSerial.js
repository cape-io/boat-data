import { forEach } from 'lodash'
import PubSub from 'pubsub-js'
import sendMsg from './broadcast'

export function sendAis(sentence, feeds) {
  if (feeds) forEach(feeds, ({ ip, port }) => sendMsg(sentence, ip, port))
}
// Sending off all AIS data.
export function handleSerialData({ action, store }) {
  const state = store.getState()
  const { aisFeeds, lanBroadcast, lanPort } = state.config
  if (action.payload.isAis) sendAis(action.payload.sentence, aisFeeds)
  if (lanBroadcast && lanPort) sendMsg(action.payload.sentence, lanBroadcast, lanPort)
  PubSub.publish('serial', action.payload)
}
