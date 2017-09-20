import { createSimpleAction, noopAction } from 'cape-redux'
import { now, set } from 'lodash'

export const POSITION_UPDATE = 'position/update'
export function posPayload(message) {
  if (!message.time) set(message, 'time', now())
  return message
}
export const positionUpdate = createSimpleAction(POSITION_UPDATE, posPayload)

export const WAYPOINT_UPDATE = 'position/waypoint'
export const waypointUpdate = createSimpleAction(WAYPOINT_UPDATE)

export const ALARM_DISTANCE = 'position/alarm'
export const alarmDistance = createSimpleAction(ALARM_DISTANCE)

export const ALARM_DISABLE = 'position/alarm-off'
export const alarmDisable = noopAction(ALARM_DISABLE)

export const LIMIT_SRC = 'position/limit-src'
export const limitSrc = createSimpleAction(LIMIT_SRC)
