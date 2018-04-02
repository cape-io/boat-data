import { curry, flow, padCharsStart, reduce, replace, toUpper } from 'lodash/fp'
import { transformProp } from 'cape-lodash'

export const methodWith = (methodId, args) => item => item[methodId](...args)

export const rmDollar = replace(/^\$/, '')
export function stripDollar(baseString) {
  return baseString[0] === '$' ? baseString.slice(1) : baseString
}

export const checkSumReducer = (result = 0, value) =>
  result ^ value.charCodeAt() // eslint-disable-line no-bitwise

// WITHOUT the dollar sign please.
export const getChecksum = flow(
  reduce(checkSumReducer, undefined),
  methodWith('toString', [16]),
  toUpper,
  padCharsStart('0', 2)
)

// Conventional field delimited messages. Start delimiter is always $.
export function toSentence(parts) {
  const base = parts.join(',')
  return `$${base}*${getChecksum(base)}` // <CR><LF>
}

export const setFields = curry((transformer, item) =>
  ({ ...item, ...transformer(item) }))
export const setFieldsWith = curry((withId, transformer, item) =>
  ({ ...item, ...transformProp(transformer, withId)(item) }))
