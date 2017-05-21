import { toString } from 'lodash'
import { createSimpleAction } from 'cape-redux'
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

// export const NMEA_DATA = 'boatData/NmeaData'
export const SERIAL_DATA = 'boatData/SerialData'
export const serialData = createSimpleAction(SERIAL_DATA, createDataPayload)

// export const nmeaData = createSimpleAction(NMEA_DATA, createDataPayload)
// export const serialData = cond([
//   [isAis, nmeaAis],
//   [isData, nmeaData],
// ])

export const SERIAL_CLOSE = 'boatData/SerialClose'
export function serialClose(payload) {
  console.error(`Serial process exited with code ${payload}.`)
  return { type: SERIAL_CLOSE, payload }
}

export const SERIAL_ERROR = 'boatData/SerialError'
export const serialErr = createSimpleAction(SERIAL_ERROR, toString)

export const SERIAL_OPEN = 'boatData/SerialOpen'
export function serialOpen() {
  console.log('serial port open')
  return { type: SERIAL_OPEN }
}
