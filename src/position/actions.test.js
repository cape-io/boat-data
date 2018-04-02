import { flow, map, now } from 'lodash/fp'
import { posPayload, positionUpdate, POSITION_UPDATE } from './actions'
/* globals describe test expect */

describe('posPayload', () => {
  test('leave alone if obj has time', () => {
    const args1 = { time: now() }
    expect(posPayload(args1)).toBe(args1)
  })
  test('create obj and add time', () => {
    const res = posPayload()
    expect(res).toMatchObject({
      time: expect.any(Number),
    })
  })
})

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
export const arrArgs = ([latitude, longitude, time]) => ({
  latitude,
  longitude,
  src: 'test',
  time,
})
export const actions = map(flow(arrArgs, positionUpdate), positions)
describe('positionUpdate', () => {
  test('should add time if it is missing', () => {
    const time = now()
    const pos1 = positionUpdate({ latitude: 38, longitude: -76, src: 'test1' })
    expect(pos1).toEqual({
      type: POSITION_UPDATE,
      payload: {
        latitude: 38,
        longitude: -76,
        time: expect.any(Number),
        src: 'test1',
      },
    })
    expect(pos1.payload.time).toBeGreaterThanOrEqual(time)
    expect(pos1.payload.time).toBeLessThan(time + 100)
    expect(actions[0].payload.time).toBe(positions[0][2])
  })
  test('Should handle no coords', () => {
    const pos2 = positionUpdate(null)
    // console.log(pos2)
  })
})
