import { serialData, SERIAL_DATA } from './actions'

/* globals describe test expect */

describe('serialData', () => {
  test('should handle ais', () => {
    expect(serialData('!AIVDO,1,1,,,B5NRnlP00NWr4@Sjm6qHgwiUoP06,0*0D'))
    .toMatchObject({
      type: SERIAL_DATA,
      payload: {
        isAis: true,
        isData: false,
        name: 'AIVDO',
        sentence: '!AIVDO,1,1,,,B5NRnlP00NWr4@Sjm6qHgwiUoP06,0*0D',
      },
    })
  })
  test('should handle gps data', () => {
    expect(serialData('$GPGLL,2631.40923,N,07658.59501,W,035239.00,A,D*7E'))
    .toMatchObject({
      type: SERIAL_DATA,
      payload: {
        isAis: false,
        isData: true,
        name: 'GPGLL',
        sentence: '$GPGLL,2631.40923,N,07658.59501,W,035239.00,A,D*7E',
      },
    })
  })
})
