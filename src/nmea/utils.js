import { flow, method, padCharsStart, reduce, replace, toUpper } from 'lodash/fp'

const methodWith = method.convert({ fixed: false })

export const rmDollar = replace(/^\$/, '')
export function stripDollar(baseString) {
  return baseString[0] === '$' ? baseString.slice(1) : baseString
}

export const checkSumReducer = (result = 0, value) =>
  result ^ value.charCodeAt() // eslint-disable-line no-bitwise

// WITHOUT the dollar sign please.
export const getChecksum = flow(
  reduce(checkSumReducer, undefined),
  methodWith('toString', 16),
  toUpper,
  padCharsStart('0', 2)
)

// Conventional field delimited messages. Start delimiter is always $.
export function toSentence(parts) {
  const base = parts.join(',')
  return `$${base}*${getChecksum(base)}`
}
