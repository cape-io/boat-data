import { toSentence } from './nmea'
import { metersToFeet, metersToFathoms } from './utils'

export function dbs(meters) {
  return toSentence([
    '$--DBS',
    metersToFeet(meters).toFixed(1),
    'f',
    meters.toFixed(2),
    'M',
    metersToFathoms(meters).toFixed(1),
    'F',
  ])
}
export function dbt(meters) {
  return toSentence([
    '$--DBT',
    metersToFeet(meters).toFixed(1),
    'f',
    meters.toFixed(2),
    'M',
    metersToFathoms(meters).toFixed(1),
    'F',
  ])
}
