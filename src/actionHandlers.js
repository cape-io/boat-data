import { eq, flow, get } from 'lodash/fp'
import { condId, oneOf, renamePick } from 'cape-lodash'
import { hdm } from './nmea/encode'
import { publish } from './mqtt'
import { positionUpdate } from './position/actions'
import { nextAction } from './utils'
import { sendUdp } from './actionHandlerSerial'

export const getPayload = get(['action', 'payload'])
export const getPgn = flow(getPayload, get('pgn'))
export const gpsPgns = [
  129793, // AIS UTC and Date Report
  // 129025, // Position, Rapid Update
  129029, // GNSS Position Data
]

export const isGpsPgn = flow(getPgn, oneOf(gpsPgns))
export const isHeadingPgn = flow(getPgn, eq(127250))
export const getLatLong = renamePick({
  'fields.Latitude': 'latitude',
  'fields.Longitude': 'longitude',
  src: 'src',
})
export function sendGps({ action, store }) {
  const payload = getLatLong(action.payload)
  store.dispatch(positionUpdate(payload))
  publish('gps', JSON.stringify(payload))
}
export function sendHeading(reduxStore, heading) {
  const state = reduxStore.getState()
  const sentence = hdm(heading)
  sendUdp(state.config, sentence)
}

export const handleAnalyzer = flow(
  nextAction,
  condId(
    [isGpsPgn, sendGps],
    [isHeadingPgn, sendHeading],
  ),
)
