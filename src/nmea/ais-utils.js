import { flow, map } from 'lodash/fp'
import BitSet from 'bitset'
import { toByteArray } from './base64'

// To recover the six bits, subtract 48 from the ASCII character value.
export const charDecimal = char => char.charCodeAt(0) - 48
// if the result is greater than 40 subtract 8.
export const sub8over40 = num => (num > 40 ? num - 8 : num)
// Chars begin with "0" (64) and end with "w" (87)
export const getByteLength = arr => Math.ceil((arr.length * 6) / 8)
export const charToInt = flow(charDecimal, sub8over40)
export const strToIntArr = map(charToInt)
export const binaryReducer = (accumulator, int, index) => {
  accumulator.setBits(index * 6, int, 6)
  return accumulator
}

export const toBitSet = str => new BitSet(toByteArray(str))

// Speed over ground is in 0.1-knot resolution from 0 to 102 knots.
// Value 1023 indicates speed is not available, value 1022 indicates 102.2 knots or higher.
