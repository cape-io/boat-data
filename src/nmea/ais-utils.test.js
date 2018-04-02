/* globals describe test expect */
import { TextDecoder } from 'text-encoding'
import { charToInt, strToIntArr, toBitSet } from './ais-utils'
import { lookup, decodeMap, toByteArray } from './base64'

describe('charToInt', () => {
  test('returns expected decimal', () => {
    expect(charToInt('0')).toBe(0)
    expect(charToInt('1')).toBe(1)
    expect(charToInt('U')).toBe(37)
    expect(charToInt('V')).toBe(38)
    expect(charToInt('W')).toBe(39)
    expect(charToInt('`')).toBe(40)
    expect(charToInt('a')).toBe(41)
    expect(charToInt('b')).toBe(42)
    expect(charToInt('c')).toBe(43)
    // console.log(lookup)
    // console.log(decodeMap)
  })
})
const str = 'B5NRnlP00NWr4@Sjm6qHgwiUoP06'
const strArr = [
  18, 5, 30, 34, 54, 52, 32, 0, 0, 30, 39, 58, 4, 16,
  35, 50, 53, 6, 57, 24, 47, 63, 49, 37, 55, 32, 0, 6,
]
describe('strToIntArr', () => {
  test('returns array of', () => {
    expect(strToIntArr(str)).toEqual(strArr)
  })
})

describe('toBitSet', () => {
  test('finds correct binary', () => {
    const res = toBitSet(str)
    expect(res)
  })
})
