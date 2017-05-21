import { serialData, NMEA_AIS, NMEA_DATA } from './actions'

/* globals describe test expect */

describe('serialData', () => {
  test('should handle ais', () => {
    expect(serialData('!AIVDO,1,1,,,B5NRnlP00NWr4@Sjm6qHgwiUoP06,0*0D'))
    .toMatchObject({
      type: NMEA_AIS,
      payload: {
        name: 'AIVDO',
        sentence: '!AIVDO,1,1,,,B5NRnlP00NWr4@Sjm6qHgwiUoP06,0*0D',
      },
    })
  })
  test('should handle gps data', () => {
    expect(serialData('$GPGLL,2631.40923,N,07658.59501,W,035239.00,A,D*7E'))
    .toMatchObject({
      type: NMEA_DATA,
      payload: {
        name: 'GPGLL',
        sentence: '$GPGLL,2631.40923,N,07658.59501,W,035239.00,A,D*7E',
      },
    })
  })
})
