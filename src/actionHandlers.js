import { flow, get } from 'lodash/fp'
import { condId, oneOf, renamePick } from 'cape-lodash'
import { publish } from './mqtt'
import { positionUpdate } from './position/actions'
import { nextAction } from './utils'

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
export function sendGps({ action, store }) {
  const payload = getLatLong(action.payload)
  store.dispatch(positionUpdate(payload))
  publish('gps', JSON.stringify(payload))
}
export const handleAnalyzer = flow(
  nextAction,
  condId([isGpsPgn, sendGps]),
)
