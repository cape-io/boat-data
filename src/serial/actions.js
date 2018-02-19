import { overEvery, toString } from 'lodash/fp'
import { createSimpleAction, noopAction } from 'cape-redux'
import { getName, isAis, isData } from '../nmea/decode'

export function createDataPayload(payload) {
  return {
    isAis: isAis(payload),
    isData: isData(payload),
    name: getName(payload),
    sentence: payload,
  }
}
// export const NMEA_AIS = 'boatData/NmeaAIS'
// export const nmeaAis = createSimpleAction(NMEA_AIS, createDataPayload)
// export const nmeaData = createSimpleAction(NMEA_DATA, createDataPayload)
// export const serialData = cond([
//   [isAis, nmeaAis],
//   [isData, nmeaData],
// ])

export const SERIAL_DATA = 'serial/SerialData'
export const serialData = createSimpleAction(SERIAL_DATA, createDataPayload)

export const SERIAL_CLOSE = 'serial/SerialClose'
export function serialClose(payload) {
  console.error(`Serial process exited with code ${payload}.`)
  return { type: SERIAL_CLOSE, payload }
}
export const PARSER_CLOSE = 'serial/ParserClose'
export const parserClose = createSimpleAction(PARSER_CLOSE)

export const SERIAL_ERROR = 'serial/SerialError'
export const serialErr = overEvery([
  console.error,
  createSimpleAction(SERIAL_ERROR, toString),
])
export const PARSER_ERROR = 'serial/ParserError'
export const parserErr = noopAction(PARSER_ERROR)

export const SERIAL_OPEN = 'serial/SerialOpen'
export function serialOpen() {
  console.log('Serial port open')
  return { type: SERIAL_OPEN }
}

export const PARSER_OPEN = 'serial/ParserOpen'
export const parserOpen = noopAction(PARSER_OPEN)
