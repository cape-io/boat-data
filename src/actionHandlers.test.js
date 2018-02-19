/* globals describe test expect */
import { isDepth } from './actionHandlers'

const action = {
  payload: {
    timestamp: '2018-02-19T19:30:46.492Z',
    prio: 3,
    src: 115,
    dst: 255,
    pgn: 128267,
    description: 'Water Depth',
    fields: {
      SID: 0,
      Depth: 5.4,
      Offset: -0.001,
    },
  },
}
const action2 = {
  payload: {
    timestamp: '2018-02-19T19:30:46.367Z',
    prio: 3,
    src: 35,
    dst: 255,
    pgn: 128267,
    description: 'Water Depth',
    fields: {
      Depth: 2.56,
      Offset: 0.396,
    },
  },
}
describe('isDepth', () => {
  test('Ignore old sensor.', () => {
    expect(isDepth({ action })).toBe(false)
  })
  test('Accept new', () => {
    expect(isDepth({ action: action2 })).toBe(true)
  })
})
