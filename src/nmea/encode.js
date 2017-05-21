import { curry } from 'lodash'
import { metersToFeet, metersToFathoms, toSentence } from './utils'

export const depth = curry((prefix, meters) => toSentence([
  prefix,
  metersToFeet(meters).toFixed(1),
  'f',
  meters.toFixed(2),
  'M',
  metersToFathoms(meters).toFixed(1),
  'F',
]))

export const dbs = depth('$--DBT')
export const dbt = depth('$--DBT')
