import { nmeaAis, nmeaData } from './actions'
import { getName, isAis } from './nmeaUtils'
import sendMsg from './broadcast'

export function sendAis(payload) {
  sendMsg(payload, '5.9.207.224', 6636)
  sendMsg(payload, '54.204.25.151', 7113)
  sendMsg(payload, '144.76.105.244', 2092)
}
export function sendNmea(payload) {

}
export function handleSerialData({ action, next }) {
  if (isAis(action.payload)) {
    sendAis(action.payload)
    return next(nmeaAis(action.payload))
  }
  return next(nmeaData({
    name: getName(action.payload),
    sentence: action.payload,
  }))
}
