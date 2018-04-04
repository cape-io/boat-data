import {
   eq, flow, get, head, mergeAll, over,
  set, split, startsWith, tail, toUpper, zipObject,
} from 'lodash/fp'
import { createObj, setField } from 'cape-lodash'
import { simpleSelector, structuredSelector } from 'cape-select'
import { fieldInfo, processType } from './fields'
import { getChecksum, methodWith, rmFirstChar, setFieldsWith } from './utils'

export const isEncapsulatedData = startsWith('!')
export const isConventionalData = startsWith('$')
export const getTalker = methodWith('slice', [1, -3])
export const getType = methodWith('slice', [-3])

// Send in the first nmea field. Like '!AIVDO' or '$GPGGA'.
export const getField0Info = flow(toUpper, structuredSelector({
  talker: getTalker,
  type: getType,
  isEncapsulated: isEncapsulatedData,
  isConventional: isConventionalData,
}))

export const splitDataChecksum = flow(split('*'), zipObject(['fields', 'checksum']))
export const getDataChecksum = flow(get('fields'), rmFirstChar, getChecksum)
export const compareChecksum = simpleSelector(getDataChecksum, get('checksum'), eq)

// Pass full nmea sentence string.
// Return fields, checksum, isValid.
export const getInfo = flow(
  splitDataChecksum,
  setField('isValid', compareChecksum),
)

// Pass nmea sentence string _without_ checksum.
// Returns talker str, type str, isEncapsulated bool, isConventional bool, fields array.
export const getNameTalkerFields = flow(
  split(','),
  over([flow(head, getField0Info), flow(tail, createObj('fields'))]),
  mergeAll
)

export function setData({ type, fields }) {
  const info = fieldInfo[type]
  if (!info || !fields) return null
  // const reducer = (result, value, index) => set(
  //   result, info.fields[index].id, get(processType, info.fields[index].type)(value))
  function reducer(result, value, index) {
    const fieldId = info.fields[index].id
    const processorId = info.fields[index].type
    const processor = get(processorId, processType)
    return set(fieldId, processor(value), result)
  }
  return fields.reduce(reducer, {})
}

export const decode = flow(
  createObj('sentence'),
  setFieldsWith('sentence', getInfo),
  setFieldsWith('fields', getNameTalkerFields),
  setField('data', setData),
)
