import { curry } from 'lodash/fp'
import { metersToFeet, metersToFathoms } from '../utils'
import { toSentence } from './utils'

export const depth = curry((prefix, meters) => toSentence([
  prefix,
  metersToFeet(meters).toFixed(1),
  'f',
  meters.toFixed(2),
  'M',
  metersToFathoms(meters).toFixed(1),
  'F',
]))

export const dbs = depth('--DBS')
export const dbt = depth('--DBT')

export const mvw = ({ angle, reference = 'R', speed, unit = 'M' }) => toSentence([
  '--MWV',
  angle.toFixed(1),
  reference,
  speed.toFixed(1),
  unit,
  'A',
])
export const hdm = heading => toSentence([
  '--HDM',
  heading.toFixed(1),
  'M',
])
