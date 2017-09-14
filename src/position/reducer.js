import { getDistance } from 'geolib'
import { flow, round } from 'lodash'
import { setIn, setKey } from 'cape-lodash'
import { createReducer } from 'cape-redux'
import { ALARM_DISTANCE, POSITION_UPDATE, WAYPOINT_UPDATE } from './actions'

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
export function addDistance(state) {
  const dist = getDistance(state.savedPosition, state.lastPosition, 1, 1)
  return setIn(['lastPosition', 'distance'], state, dist)
}
export const addLastPos = setKey('lastPosition')
export const addSavedPos = setKey('savedPosition')
export function savePosition(state) {
  if (state.lastPosition.distance > state.updateMeters) {
    const period = round((state.lastPosition.time - state.savedPosition.time) / 1000)
    const newState = addSavedPos(state, setKey('period', state.lastPosition, period))
    console.log(newState.savedPosition)
    return newState
  }
  console.log(state.lastPosition.distance)
  return state
}
export const processPosUp = flow(
  addLastPos,
  addDistance,
  savePosition,
)
export function positionUp(state, payload) {
  if (skipPos(state, payload)) return state
  if (!state.savedPosition) return addSavedPos(state, payload)
  return processPosUp(state, payload)
}
export const reducers = {
  [ALARM_DISTANCE]: setKey('waypointAlarmDistance'),
  [POSITION_UPDATE]: positionUp,
  [WAYPOINT_UPDATE]: setKey('waypoint'), // Leaving waypoint distance calc for selector.
}
export default createReducer(reducers, defaultState)
