import { flow, round } from 'lodash'
import { condId, setField, setKey, setKeyVal } from 'cape-lodash'
import { createReducer } from 'cape-redux'
import { ALARM_DISABLE, ALARM_DISTANCE, POSITION_UPDATE, WAYPOINT_UPDATE } from './actions'
import { getPosDist, getTime, toggleAlarm, waypointAlarm } from './select'

export const position = {
  latitude: null,
  longitude: null,
  src: null,
  time: null, // timestamp
  distance: null, // meters
  period: null, // seconds
}

export const defaultState = {
  alarm: {
    active: false,
    distance: 46, // meters
    over: true, // false to trigger alarm when under.
    time: null, // Time of last toggle.
    disabled: false, // Should we prevent toggle of alarm status?
  },
  updateMeters: 0.7, // Update after having moved this many meters.
  limitSrc: 130,
  savedPosition: null,
  lastPosition: position,
  waypoint: null,
}

export function skipPos(state, payload) {
  return state.limitSrc && state.limitSrc !== payload.src
}
// This _could_ be a memoized selector and not saved to state.
// I think it provides enough convenience to leave it.
export const addDistance = setField('lastPosition.distance', getPosDist)
export const addLastPos = setKey('lastPosition')
export const addSavedPos = setKey('savedPosition')

export function savePosition(state) {
  if (state.lastPosition.distance > state.updateMeters) {
    const period = round((state.lastPosition.time - state.savedPosition.time) / 1000)
    const newState = addSavedPos(state, setKey('period', state.lastPosition, period))
    return newState
  }
  return state
}

export const saveAlarm = condId([
  toggleAlarm, flow(
    setField('alarm.active', waypointAlarm),
    setField('alarm.time', getTime)
  ),
])

export const processPosUp = flow(
  addLastPos,
  addDistance,
  savePosition,
  saveAlarm,
)
export function positionUp(state, payload) {
  if (skipPos(state, payload)) return state
  if (!state.savedPosition) return addLastPos(addSavedPos(state, payload), payload)
  return processPosUp(state, payload)
}
export const alarmDisable = flow(
  setKeyVal('alarm.watching', false),
  setKeyVal('alarm.active', false)
)
export const reducers = {
  [ALARM_DISTANCE]: setKey('alarm.distance'),
  [POSITION_UPDATE]: positionUp,
  [WAYPOINT_UPDATE]: setKey('waypoint'), // Leaving waypoint distance calc for selector.
  [ALARM_DISABLE]: alarmDisable,
}
export default createReducer(reducers, defaultState)
