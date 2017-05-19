import { nmeaAis, nmeaData } from './actions'
import { getName, isAis } from './nmeaUtils'

export function handleSerialData({ action, next, store }) {
  if (isAis(action.payload)) return next(nmeaAis(action.payload))
  return next(nmeaData({
    name: getName(action.payload),
    sentence: action.payload,
  }))
}
