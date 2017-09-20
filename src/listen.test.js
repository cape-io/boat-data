/* globals describe test expect */
import { set } from 'lodash'
import { getDepth } from './listen'

const state = {}
set(state, 'data.data.115.128267.fields.Depth', 10)

describe('getDepth', () => {
  test('Get deeply nested value.', () => {
    expect(getDepth(state))
    .toBe(10)
  })
})
