import { serialData, SERIAL_DATA } from './actions'
import { ais1, ais1decoded, gll, gllDecoded } from '../nmea/mock'
/* globals describe test expect */

describe('serialData', () => {
  test('should handle ais', () => {
    expect(serialData(ais1))
      .toEqual({
        payload: ais1decoded,
        type: SERIAL_DATA,
      })
  })

  test('should handle gps data', () => {
    expect(serialData(gll))
      .toMatchObject({
        type: SERIAL_DATA,
        payload: gllDecoded,
      })
  })
})
