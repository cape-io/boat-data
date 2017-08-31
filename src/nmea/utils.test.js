/* globals describe test expect */
import { computeChecksum, getChecksum, stripDollar } from './utils'

// $--DBT,17.6,f,5.37,M,2.9,F*1B
// $--DBT,16.7,f,5.10,M,2.8,F*1F
// $--DBT,18.2,f,5.55,M,3.0,F*1C
// $--DBT,16.3,f,4.97,M,2.7,F*1A
// $--DBT,16.6,f,5.06,M,2.8,F*19
// http://nmeachecksum.eqth.net

const dbt1 = '$--DBT,17.6,f,5.37,M,2.9,F'

describe('computeChecksum', () => {
  test('Calculate the checksum of a NMEA0183 sentence.', () => {
    expect(computeChecksum(dbt1)).toBe('1B')
  })
})
describe('getChecksum', () => {
  test('Calculate the checksum of a NMEA0183 sentence.', () => {
    expect(getChecksum(dbt1)).toBe('1B')
  })
})
describe('stripDollar', () => {
  test('Remove first dollar sign.', () => {
    expect(stripDollar('$1$2')).toBe('1$2')
    expect(stripDollar('1$$2')).toBe('1$$2')
  })
})
