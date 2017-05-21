import { getName, getParts, isAis } from './decode'

/* globals describe test expect */

const ais1 = '!AIVDO,1,1,,,B5NRnlP00NWr4@Sjm6qHgwiUoP06,0*0D'
const gpgga = '$GPGGA,035237.00,2631.40930,N,07658.59503,W,2,10,1.00,-3.3,M,-34.4,M,,0000*40'
const psrt = '$PSRT,TXS,0000,1*47'

describe('getParts', () => {
  test('split a nmea into parts on comma.', () => {
    expect(getParts(ais1))
    .toMatchObject(['!AIVDO', '1', '1', '', '', 'B5NRnlP00NWr4@Sjm6qHgwiUoP06', '0*0D'])
  })
})
describe('isAis', () => {
  test('true when starts with a bang!', () => {
    expect(isAis(ais1)).toBe(true)
  })
  test('false when start with anything else', () => {
    expect(isAis(gpgga)).toBe(false)
  })
})
describe('getName', () => {
  test('get first part without ! or $', () => {
    expect(getName(ais1)).toBe('AIVDO')
    expect(getName(gpgga)).toBe('GPGGA')
    expect(getName(psrt)).toBe('PSRT')
  })
})
