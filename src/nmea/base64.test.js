/* globals describe test expect */
import { fromByteArray, payloadLookup, stringLookup, toByteArray } from './base64'
import { ais1base64, ais1byteArray, ais1six, msg5base64, msg5byteArray } from './mock'

describe('toByteArray', () => {
  test('returns array of', () => {
    const res = toByteArray(ais1base64)
    expect(res).toEqual(ais1byteArray)
    expect(toByteArray(msg5base64)).toEqual(msg5byteArray)
  })
})
describe('fromByteArray', () => {
  test('returns string', () => {
    const res = fromByteArray(ais1byteArray)
    expect(res).toBe(ais1base64)
  })
})
describe('decodeAllChars', () => {
  test('returns array of 6 bit numbers', () => {
    expect(payloadLookup.decodeAllChars(ais1base64)).toEqual(ais1six)
  })
})
describe('payloadLookup stringLookup chars', () => {
  test('chars returns string', () => {
    expect(payloadLookup.chars)
      .toBe('0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVW`abcdefghijklmnopqrstuvw')
    expect(stringLookup.chars)
      .toBe('@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_ !"#$%&\'()*+,-./0123456789:;<=>?')
    expect(stringLookup.byCode[0]).toBe('@')
    expect(stringLookup.byCode[30]).toBe('^')
    expect(stringLookup.byCode[31]).toBe('_')
  })
})
