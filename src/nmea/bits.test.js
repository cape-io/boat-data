/* globals describe test expect */
import { get32 } from './bits'
import { ais1byteArray } from './mock'

describe('get32', () => {
  test('returns bits', () => {
    expect(get32(ais1byteArray, 0, 6)).toBe(18)
    expect(get32(ais1byteArray, 6, 2)).toBe(0)
    expect(get32(ais1byteArray, 8, 30)).toBe(367572690)
  })
})
