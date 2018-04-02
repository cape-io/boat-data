import {
   eq, flow, get, head, identity, mergeAll, over,
  set, split, startsWith, tail, toUpper, zipObject,
} from 'lodash/fp'
import { createObj, setField } from 'cape-lodash'
import { simpleSelector, structuredSelector } from 'cape-select'
import { fieldInfo, processType } from './fields'
import { getChecksum, methodWith, setFieldsWith } from './utils'

// export const getTalkerId
export const isEncapsulatedData = startsWith('!')
export const isConventionalData = startsWith('$')
export const removeFirstChar = methodWith('slice', [1])
export const getTalker = methodWith('slice', [1, -3])
export const getType = methodWith('slice', [-3])

export const getField0Info = flow(toUpper, structuredSelector({
  talker: getTalker,
  type: getType,
  isEncapsulated: isEncapsulatedData,
  isConventional: isConventionalData,
}))

export const getNameTalkerFields = flow(
  split(','),
  over([flow(head, getField0Info), flow(tail, createObj('fields'))]),
  mergeAll
)
export const splitDataChecksum = flow(split('*'), zipObject(['fields', 'checksum']))
export const getDataChecksum = flow(get('fields'), removeFirstChar, getChecksum)
export const compareChecksum = simpleSelector(getDataChecksum, get('checksum'), eq)

export const getInfo = flow(
  splitDataChecksum,
  setField('isValid', compareChecksum),
  setFieldsWith('fields', getNameTalkerFields)
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
  setField('data', setData),
)
