import {
  curry, eq, flow, get, head, mergeAll, over,
  split, startsWith, tail, zipObject,
} from 'lodash/fp'
import { createObj, setField, transformProp } from 'cape-lodash'
import { simpleSelector, structuredSelector } from 'cape-select'
import { getChecksum } from './utils'

export const setFields = curry((transformer, item) =>
  ({ ...item, ...transformer(item) }))
export const setFieldsWith = curry((withId, transformer, item) =>
  ({ ...item, ...transformProp(transformer, withId)(item) }))

const methodWith = (methodId, args) => item => item[methodId](...args)

// export const getTalkerId
export const isEncapsulatedData = startsWith('!')
export const isConventionalData = startsWith('$')
export const removeFirstChar = methodWith('slice', [1])
export const getTalker = methodWith('slice', [1, -3])
export const getType = methodWith('slice', [-3])

export const getField0Info = structuredSelector({
  talker: getTalker,
  type: getType,
  isEncapsulated: isEncapsulatedData,
  isConventional: isConventionalData,
})

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

export const decode = flow(createObj('sentence'), setFieldsWith('sentence', getInfo))
