import { toString } from 'lodash'
import { createSimpleAction } from 'cape-redux'

export const SERIAL_DATA = 'boatData/SerialData'
export function serialData(payload) {
  // console.log(payload)
  // Could decide what kind of data and parse if possible here.
  return { type: SERIAL_DATA, payload }
}

export const SERIAL_CLOSE = 'boatData/SerialClose'
export function serialClose(payload) {
  console.error(`Serial process exited with code ${payload}.`)
  return { type: SERIAL_CLOSE, payload }
}

export const SERIAL_ERROR = 'boatData/SerialError'
export const serialErr = createSimpleAction(SERIAL_ERROR, toString)

export const SERIAL_OPEN = 'boatData/SerialOpen'
export function serialOpen() {
  console.log('serial open')
  return { type: SERIAL_OPEN }
}
