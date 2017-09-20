import { flow, identity, method } from 'lodash'
import { fpBranch } from 'cape-lodash'
import { addListener } from 'cape-redux'
import { getAlarm, getWaypointDistance } from './select'

export const messageTrue = 'DRAG ALARM! FREE SPIRIT is outside the alarm radius.'
export const messageFalse = 'FREE SPIRIT is back inside the radius.'
export const getMsg = fpBranch(messageTrue, messageFalse)
export const destinationNumbers = '16128459876<16128604060<16179596539'
// export const destinationNumbers = '16179596539'
export function toAlarm(state) {
  console.log('Alarm!', state)
  return {
    text: `${getMsg(getAlarm(state))} Distance of ${getWaypointDistance(state)} meters.`,
    dst: destinationNumbers,
  }
}

export default (store, alarmFunc, selectReducer = identity) =>
  addListener(flow(selectReducer, getAlarm), store, () =>
    flow(method('getState'), selectReducer, toAlarm, alarmFunc)(store)
  )
