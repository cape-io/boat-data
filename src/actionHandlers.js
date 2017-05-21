import { forEach } from 'lodash'
import sendMsg from './broadcast'

export function sendAis(sentence, feeds) {
  forEach(feeds, ({ ip, port }) => sendMsg(sentence, ip, port))
}
export function handleSerialData({ action, store }) {
  const state = store.getState()
  if (action.payload.isAis) sendAis(action.payload.sentence, state.config.aisFeeds)
  sendMsg(action.payload.sentence, state.config.lanBroadcast, state.config.lanPort)
}
