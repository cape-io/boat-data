/* globals describe jest test expect */
import { createStore } from 'redux'
import reducer, { position, skipPos } from './reducer'
import {
  getAlarm, getLastPos, getSavedPos, getWaypoint,
  getWaypointAlarmDistance, getWaypointDistance, hasWaypoint,
} from './select'
import { alarmDistance, limitSrc, waypointUpdate } from './actions'
import { actions } from './actions.test'
import createAlarm from './alarm'

const store = createStore(reducer)
const alarmFunc = jest.fn()
createAlarm(store, alarmFunc)

store.dispatch(alarmDistance(18))
describe('ALARM_DISTANCE', () => {
  test('Set alarm distance property.', () => {
    expect(getWaypointAlarmDistance(store.getState()))
    .toBe(18)
  })
})
const waypoint = {
  latitude: 38.9634659, // 38.963588
  longitude: -76.4809707, // -76.481038
}
describe('WAYPOINT_UPDATE', () => {
  test('Set waypoint.', () => {
    store.dispatch(waypointUpdate(waypoint))
    const state = store.getState()
    expect(getWaypoint(state))
    .toMatchObject(waypoint)
    expect(hasWaypoint(state)).toBe(true)
  })
})
describe('LIMIT_SRC', () => {
  test('skipPos should return false when no limitSrc set.', () => {
    const state = store.getState()
    expect(skipPos(state, actions[0].payload)).toBe(false)
  })
  test('skipPos should return true when limitSrc set to other than payload src.', () => {
    store.dispatch(limitSrc('foo'))
    const state = store.getState()
    expect(state.limitSrc).toBe('foo')
    expect(skipPos(state, actions[0].payload)).toBe(true)
    store.dispatch(limitSrc('test'))
    expect(skipPos(store.getState(), actions[0].payload)).toBe(false)
  })
})
describe('POSITION_UPDATE', () => {
  test('Starts with empty savedPosition and lastPosition.', () => {
    const state = store.getState()
    expect(getSavedPos(state)).toBe(null)
    expect(getLastPos(state)).toBe(position)
  })
  test('First updating of positions.', () => {
    store.dispatch(actions[0])
    const state = store.getState()
    expect(getSavedPos(state)).toMatchObject(actions[0].payload)
    expect(getLastPos(state)).toMatchObject(actions[0].payload)
    expect(getWaypointDistance(state)).toBe(13.7)
  })
  test('Updating of positions.', () => {
    store.dispatch(actions[1])
    let state = store.getState()
    expect(getAlarm(state)).toBe(false)
    expect(getWaypointDistance(state)).toBe(13.7)
    expect(getSavedPos(state)).toMatchObject(actions[0].payload)
    expect(getLastPos(state)).toMatchObject(actions[1].payload)
    expect(getLastPos(state).distance).toBe(0.7)
    store.dispatch(actions[2])
    state = store.getState()
    expect(getAlarm(state)).toBe(false)
    expect(getWaypointDistance(state)).toBe(14.8)
    expect(getSavedPos(state)).toMatchObject(actions[2].payload)
    expect(getSavedPos(state).distance).toBe(1.1)
    expect(getSavedPos(state).period).toBe(224)
    expect(getLastPos(state)).toMatchObject(actions[2].payload)
    expect(getLastPos(state).distance).toBe(1.1)
    store.dispatch(actions[3])
    state = store.getState()
    expect(getAlarm(state)).toBe(false)
    expect(getWaypointDistance(state)).toBe(4.6)
    expect(getSavedPos(state)).toMatchObject(actions[3].payload)
    expect(getSavedPos(state).distance).toBe(10.3)
    expect(getSavedPos(state).period).toBe(76)
    expect(getLastPos(state)).toMatchObject(actions[3].payload)
    expect(getLastPos(state).distance).toBe(10.3)
    store.dispatch(actions[4])
    state = store.getState()
    expect(getAlarm(state)).toBe(false)
    expect(getWaypointDistance(state)).toBe(1.2)
    expect(getSavedPos(state)).toMatchObject(actions[4].payload)
    expect(getSavedPos(state).distance).toBe(4.4)
    store.dispatch(actions[5])
    state = store.getState()
    expect(getAlarm(state)).toBe(false)
    expect(getWaypointDistance(state)).toBe(1.1)
    store.dispatch(actions[6])
    state = store.getState()
    expect(getAlarm(state)).toBe(false)
    expect(state.alarm.time).toBe(null)
    expect(getWaypointDistance(state)).toBe(11.2)
    expect(alarmFunc).not.toHaveBeenCalled()
    // Alarm.
    store.dispatch(actions[7])
    state = store.getState()
    expect(getAlarm(state)).toBe(true)
    expect(state.alarm.time).toBe(actions[7].payload.time)
    expect(getWaypointDistance(state)).toBe(27.8)
    expect(alarmFunc).toHaveBeenCalledTimes(1)
    expect(alarmFunc).toHaveBeenLastCalledWith({
      dst: '16179596539',
      text: 'DRAG ALARM! FREE SPIRIT is outside the alarm radius. Distance of 27.8 meters.',
    })
    // Alarm off.
    store.dispatch(actions[6])
    state = store.getState()
    expect(getAlarm(state)).toBe(false)
    expect(getWaypointDistance(state)).toBe(11.2)
    expect(state.alarm.time).toBe(actions[6].payload.time)
    expect(alarmFunc).toHaveBeenLastCalledWith({
      dst: '16179596539',
      text: 'FREE SPIRIT is back inside the radius. Distance of 11.2 meters.',
    })
    store.dispatch(actions[5])
    expect(alarmFunc).toHaveBeenCalledTimes(2)
  })
})
