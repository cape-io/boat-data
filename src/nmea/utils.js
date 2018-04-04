import { curry, flow, padCharsStart, reduce, toUpper } from 'lodash/fp'
import { transformProp } from 'cape-lodash'

export const methodWith = (methodId, args) => item => item[methodId](...args)

export const rmFirstChar = methodWith('slice', [1])
export const addBang = str => '!'.concat(str)
export const addDollar = str => '$'.concat(str)

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
