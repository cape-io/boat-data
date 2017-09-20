import { map, now } from 'lodash'
import { positionUpdate, POSITION_UPDATE } from './actions'
/* globals describe test expect */

export const positions = [
  [38.963580, -76.481030, 1505855411114],
  [38.963580, -76.481038, 1505855535136],
  [38.963588, -76.481038, 1505855635136],
  [38.963500, -76.481000, 1505855711134],
  [38.963474, -76.480962, 1505855835136],
  [38.963458, -76.480964, 1505855854135],
  [38.963388, -76.480888, 1505855872137],
  [38.963600, -76.480700, 1505855884141],
]
export const actions = map(positions, ([latitude, longitude, time]) => positionUpdate({
  latitude,
  longitude,
  src: 'test',
  time,
}))

describe('positionUpdate', () => {
  test('should add time if it is missing', () => {
    const time = now()
    const pos1 = positionUpdate({ latitude: 38, longitude: -76, src: 'test1' })
    expect(pos1)
    .toMatchObject({
      type: POSITION_UPDATE,
      payload: {
        latitude: 38,
        longitude: -76,
        src: 'test1',
      },
    })
    expect(pos1.payload.time).toBeGreaterThanOrEqual(time)
    expect(pos1.payload.time).toBeLessThan(time + 100)
    expect(actions[0].payload.time).toBe(positions[0][2])
  })
})
