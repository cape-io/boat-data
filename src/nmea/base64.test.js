/* globals describe test expect */
import { decodeChars, fromByteArray, toByteArray } from './base64'
import { ais1base64, ais1byteArray, ais1six } from './mock'

describe('toByteArray', () => {
  test('returns array of', () => {
    const res = toByteArray(ais1base64)
    expect(res).toEqual(ais1byteArray)
  })
})
describe('fromByteArray', () => {
  test('returns string', () => {
    const res = fromByteArray(ais1byteArray)
    expect(res).toBe(ais1base64)
  })
})
describe('decodeChars', () => {
  test('returns array of 6 bit numbers', () => {
    expect(decodeChars(ais1base64)).toEqual(ais1six)
  })
})
