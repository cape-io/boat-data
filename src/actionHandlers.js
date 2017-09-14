import { forEach } from 'lodash'
import { flow, get } from 'lodash/fp'
import { condId, oneOf, renamePick } from 'cape-lodash'
import sendMsg from './broadcast'
import { publish } from './mqtt'

export function sendAis(sentence, feeds) {
  if (feeds) forEach(feeds, ({ ip, port }) => sendMsg(sentence, ip, port))
}
// Sending off all AIS data.
export function handleSerialData({ action, store }) {
  const state = store.getState()
  if (action.payload.isAis) sendAis(action.payload.sentence, state.config.aisFeeds)
  sendMsg(action.payload.sentence, state.config.lanBroadcast, state.config.lanPort)
}

export const getPayload = get(['action', 'payload'])

export const gpsPgns = [
  129793, // AIS UTC and Date Report
  // 129025, // Position, Rapid Update
  129029, // GNSS Position Data
]

export const isGpsPgn = flow(
  getPayload,
  get('pgn'),
  oneOf(gpsPgns)
)
export const getLatLong = renamePick({
  'fields.Latitude': 'latitude',
  'fields.Longitude': 'longitude',
  src: 'src',
})
export const sendGps = flow(
  getPayload,
  getLatLong,
  JSON.stringify,
  publish('gps')
)
export const handleAnalyzer = condId(
  [isGpsPgn, sendGps],
)
