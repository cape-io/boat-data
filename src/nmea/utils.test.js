/* globals describe test expect */
import { getChecksum, stripDollar } from './utils'

const dbt = [
  '--DBT,17.6,f,5.37,M,2.9,F',
  '--DBT,16.7,f,5.10,M,2.8,F',
  '--DBT,18.2,f,5.55,M,3.0,F',
  '--DBT,16.3,f,4.97,M,2.7,F',
  '--DBT,16.6,f,5.06,M,2.8,F',
  '--DBT,7.2,f,2.20,M,1.2,F',
]

describe('getChecksum', () => {
  // http://nmeachecksum.eqth.net
  test('Calculate the checksum of a NMEA0183 sentence.', () => {
    expect(getChecksum(dbt[0])).toBe('1B')
    expect(getChecksum(dbt[1])).toBe('1F')
    expect(getChecksum(dbt[2])).toBe('1C')
    expect(getChecksum(dbt[3])).toBe('1A')
    expect(getChecksum(dbt[4])).toBe('19')
    expect(getChecksum(dbt[5])).toBe('27')
  })
})
describe('stripDollar', () => {
  test('Remove first dollar sign.', () => {
    expect(stripDollar('$1$2')).toBe('1$2')
    expect(stripDollar('1$$2')).toBe('1$$2')
  })
})
