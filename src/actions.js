import { attempt, isError, toString } from 'lodash'
import { createSimpleAction } from 'cape-redux'

export const ANALYZER_DATA = 'boatData/AnalyzerData'
export function analyzerData(dataLine) {
  const payload = attempt(JSON.parse, dataLine)
  if (isError(payload)) {
    return console.error(payload.stack)
  }
  return { type: ANALYZER_DATA, payload }
}

export const SERIAL_DATA = 'boatData/SerialData'
export function serialData(payload) {
  console.log(payload)
  return { type: SERIAL_DATA, payload }
}

export const NMEA_AIS = 'boatData/NmeaAIS'
export const nmeaAis = createSimpleAction(NMEA_AIS)
export const NMEA_DATA = 'boatData/NmeaData'
export const nmeaData = createSimpleAction(NMEA_DATA)

export const ANALYZER_CLOSE = 'boatData/AnalyzerClose'
export function analyzerClose(payload) {
  console.error(`Analyzer process exited with code ${payload}.`)
  return { type: ANALYZER_CLOSE, payload }
}
export const SERIAL_CLOSE = 'boatData/SerialClose'
export function serialClose(payload) {
  console.error(`Serial process exited with code ${payload}.`)
  return { type: SERIAL_CLOSE, payload }
}

export const ANALYZER_ERROR = 'boatData/AnalyzerError'
export const analyzerErr = createSimpleAction(ANALYZER_ERROR, toString)

export const SERIAL_ERROR = 'boatData/SerialError'
export const serialErr = createSimpleAction(SERIAL_ERROR, toString)

export const SERIAL_OPEN = 'boatData/SerialOpen'
export function serialOpen(payload) {
  console.log('serial open', payload)
  return { type: SERIAL_OPEN, payload }
}
