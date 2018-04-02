import {
  compareChecksum, decode, getDataChecksum, getInfo, getNameTalkerFields,
  getTalker, isEncapsulatedData, splitDataChecksum,
 } from './decode'
import { ais1, ais2, ais3, gpgga, ais1decoded, ais2decoded } from './mock'

/* globals describe test expect */

const ais1res = {
  fields: '!AIVDO,1,1,,A,B5Ndh@P00NmDnqRWn;33;wb5oP06,0',
  checksum: '0B',
}
describe('splitDataChecksum', () => {
  test('returns object', () => {
    expect(splitDataChecksum(ais3)).toEqual(ais1res)
  })
})
describe('getDataChecksum', () => {
  test('gets checksum from fields string', () => {
    expect(getDataChecksum(ais1res)).toBe('0B')
  })
})
describe('compareChecksum', () => {
  test('tests valid', () => {
    expect(compareChecksum(ais1res)).toBe(true)
  })
  test('tests invalid', () => {
    expect(compareChecksum({ ...ais1res, checksum: '1B' })).toBe(false)
  })
})
describe('field 0 info', () => {
  test('getTalker', () => {
    expect(getTalker('!AIVDO')).toBe('AI')
    expect(getTalker('$GPGGA')).toBe('GP')
    expect(getTalker('$PSRT')).toBe('P')
  })
})

describe('getNameTalkerFields', () => {
  test('split a nmea into parts on comma.', () => {
    expect(getNameTalkerFields('!AIVDO,1,1,,,B5NRnlP00NWr4@Sjm6qHgwiUoP06,0'))
    .toEqual({
      fields: ['1', '1', '', '', 'B5NRnlP00NWr4@Sjm6qHgwiUoP06', '0'],
      isConventional: false,
      isEncapsulated: true,
      talker: 'AI',
      type: 'VDO',
    })
  })
})
describe('hasEncapsulatedData', () => {
  test('true when starts with a bang!', () => {
    expect(isEncapsulatedData(ais1)).toBe(true)
  })
  test('false when start with anything else', () => {
    expect(isEncapsulatedData(gpgga)).toBe(false)
  })
})
describe('getInfo', () => {
  test('gets checksum and info', () => {
    expect(getInfo(ais1)).toEqual({
      checksum: '0D',
      fields: ['1', '1', '', '', 'B5NRnlP00NWr4@Sjm6qHgwiUoP06', '0'],
      isConventional: false,
      isEncapsulated: true,
      isValid: true,
      talker: 'AI',
      type: 'VDO',
    })
  })
})
describe('decode', () => {
  test('decode ais', () => {
    expect(decode(ais1)).toEqual(ais1decoded)
    expect(decode(ais2)).toEqual(ais2decoded)
  })
})
