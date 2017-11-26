import { eq, flow, get } from 'lodash/fp'
import { condId, oneOf, renamePick } from 'cape-lodash'
import { hdm, mvw } from './nmea/encode'
import { publish } from './mqtt'
import { positionUpdate } from './position/actions'
import { nextAction } from './utils'
import { sendUdpLan } from './actionHandlerSerial'

export const getPayload = get(['action', 'payload'])
export const getPgn = flow(getPayload, get('pgn'))
export const gpsPgns = [
  129793, // AIS UTC and Date Report
  // 129025, // Position, Rapid Update
  129029, // GNSS Position Data
]

export const isGpsPgn = flow(getPgn, oneOf(gpsPgns))
export const isHeadingPgn = flow(getPgn, eq(127250))
export const isWindPgn = flow(getPgn, eq(130306))

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

function sendWind({ action, store }) {
  const wind = action.payload.fields
  const sentence = mvw({
    angle: wind['Wind Angle'],
    reference: 'R',
    speed: wind['Wind Speed'],
    unit: 'M',
  })
  // console.log('mvw', sentence)
  sendUdpLan(store.getState().config, sentence)
  // influx.writePoints([{ measurement: 'windSpeed', fields: { value: speed } }])
}

export const handleAnalyzer = flow(
  nextAction,
  condId(
    [isGpsPgn, sendGps],
    [isHeadingPgn, sendHeading],
    [isWindPgn, sendWind]
  ),
)
