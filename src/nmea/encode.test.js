/* globals describe test expect */
import { dbt } from './encode'

describe('dbt', () => {
  test('Turns meters reading into depth nmea.', () => {
    expect(dbt(2.2))
    .toBe('$--DBT,7.2,f,2.20,M,1.2,F*27')
  })
})
