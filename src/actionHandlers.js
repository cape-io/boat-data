import { eq, flow, get, lt, overEvery } from 'lodash/fp'
import { condId, oneOf, renamePick } from 'cape-lodash'
import { select } from 'cape-select'
import { hdm } from './nmea/encode'
import { publish } from './mqtt'
import { positionUpdate } from './position/actions'
import { nextAction } from './utils'
import { sendUdpLan } from './broadcast'
import { sendDepth, sendWind } from './dataHandler'

export const getPayload = get(['action', 'payload'])
export const getPgn = select(getPayload, 'pgn')
export const getFields = select(getPayload, 'fields')
export const gpsPgns = [
  129793, // AIS UTC and Date Report
  // 129025, // Position, Rapid Update
  129029, // GNSS Position Data
]

export const isGpsPgn = flow(getPgn, oneOf(gpsPgns))
export const isHeadingPgn = flow(getPgn, eq(127250))
export const isWindPgn = flow(getPgn, eq(130306))
export const isDepthPgn = flow(getPgn, eq(128267))
export const isDepth = overEvery([
  isDepthPgn,
  flow(select(getFields, 'Offset'), lt(0.1)), // Use new depth.
])
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
export function sendHeading({ action, store }) {
  sendUdpLan(store.getState().config, hdm(action.payload.fields.Heading))
}

function handleWind({ action, store }) {
  const data = action.payload.fields
  sendWind(store.getState().config, data['Wind Angle'], data['Wind Speed'])
}
function handleDepth({ action, store }) {
  const data = action.payload.fields
  sendDepth(store.getState().config, (data.Depth + data.Offset))
}
export const handleAnalyzer = flow(
  nextAction,
  condId(
    [isGpsPgn, sendGps],
    [isHeadingPgn, sendHeading],
    [isWindPgn, handleWind],
    [isDepth, handleDepth]
  ),
)
