import { cond, eq, flow, isFinite, negate, stubFalse, stubTrue, partialRight } from 'lodash'
import { conformsTo, get } from 'lodash/fp'
import { createSelector } from 'reselect'
import { getDistance } from 'geolib'
import { select } from 'cape-select'

export const getSavedPos = get('savedPosition')
export const getTime = select(getSavedPos, 'time')
export const getLastPos = get('lastPosition')
export const getLastDist = select(getLastPos, 'distance')
export const getDist = partialRight(getDistance, 1, 1)

export const getPosDist = createSelector(
  getSavedPos,
  getLastPos,
  getDist
)

export const getWaypoint = get('waypoint')

export const getWaypointDistance = createSelector(
  getWaypoint,
  getSavedPos,
  getDist
)

export const getWaypointAlarmDistance = get('alarm.distance')
export const alarmOver = get('alarm.over')
export const getAlarm = get('alarm.active')
export const isAlarmDisabled = get('alarm.disabled')

export const waypointAlarm = createSelector(
  getWaypointDistance,
  getWaypointAlarmDistance,
  alarmOver,
  (dist, alarm, over) => (over ? dist > alarm : dist < alarm)
)


export const hasWaypoint = flow(getWaypoint, conformsTo({
  latitude: isFinite,
  longitude: isFinite,
}))
export const toggleAlarm = cond([
  [isAlarmDisabled, stubFalse],
  [hasWaypoint, createSelector(waypointAlarm, getAlarm, negate(eq))],
  [stubTrue, stubFalse],
])
