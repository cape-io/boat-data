import { createSimpleAction, noopAction } from 'cape-redux'
import { flow, has, isPlainObject, now, set } from 'lodash/fp'

export const ensureObj = item => (isPlainObject(item) ? item : {})
export const ensureField = (fieldId, transformer) =>
  item => (has(fieldId, item) ? item : set(fieldId, transformer(item), item))

export const POSITION_UPDATE = 'position/update'
export const posPayload = flow(ensureObj, ensureField('time', now))
export const positionUpdate = createSimpleAction(POSITION_UPDATE, posPayload)

export const WAYPOINT_UPDATE = 'position/waypoint'
export const waypointUpdate = createSimpleAction(WAYPOINT_UPDATE)

export const ALARM_DISTANCE = 'position/alarm'
export const alarmDistance = createSimpleAction(ALARM_DISTANCE)

export const ALARM_DISABLE = 'position/alarm-off'
export const alarmDisable = noopAction(ALARM_DISABLE)

export const LIMIT_SRC = 'position/limit-src'
export const limitSrc = createSimpleAction(LIMIT_SRC)
