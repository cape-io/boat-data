import { createSelector } from 'reselect'
import { get } from 'lodash/fp'
import { getDistance } from 'geolib'

export const getWaypoint = get('waypoint')
export const getSavedPos = get('savedPosition')

export const getWaypointDistance = createSelector(
  getWaypoint,
  getSavedPos,
  getDistance
)

export const getWaypointAlarmDistance = get('waypointAlarmDistance')
export const alarmOver = get('waypointAlarmOver')

export const waypointAlarm = createSelector(
  getWaypointDistance,
  getWaypointAlarmDistance,
  alarmOver,
  (dist, alarm, over) => (over ? dist > alarm : dist < alarm)
)
