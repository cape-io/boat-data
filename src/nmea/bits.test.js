/* globals describe test expect */
import { get32, getBits, getBytes } from './bits'
import { ais1byteArray, msg5byteArray } from './mock'
import { aisTxt } from './base64'

describe('get32', () => {
  test('returns bits', () => {
    expect(get32(ais1byteArray, 0, 6)).toBe(18)
    expect(get32(ais1byteArray, 6, 2)).toBe(0)
    expect(get32(ais1byteArray, 8, 30)).toBe(367572690)
    expect(getBits(msg5byteArray, 0, 6).getUint8(0)).toEqual(5)
    expect(get32(msg5byteArray, 8, 30)).toBe(378112714)
    const data = getBytes(msg5byteArray, 0, 48)
    expect(data).toEqual(msg5byteArray.slice(0, 6))
    expect(get32(data, 8, 30)).toBe(378112714)
    const data2 = getBytes(msg5byteArray, 112, 120)
    expect(aisTxt(data2)).toBe('BLACK GOLD')
  })
})
