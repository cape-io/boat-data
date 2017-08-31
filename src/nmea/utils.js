import { method } from 'lodash'
import { flow, padCharsStart, reduce, replace, toUpper } from 'lodash/fp'

export const rmDollar = replace(/^\$/, '')
export function stripDollar(baseString) {
  return baseString[0] === '$' ? baseString.slice(1) : baseString
}
export function checkSumReducer(result, value) {
  return result ^ value.charCodeAt() // eslint-disable-line no-bitwise
}

// Without the dollar sign please.
export const getChecksum = flow(
  reduce(checkSumReducer, 0),
  method('toString', 16),
  toUpper,
  padCharsStart('0', 2)
)
export function toSentence(parts) {
  const base = parts.join(',')
  return `${base}*${computeChecksum(base)}`
}
