/* globals describe test expect */
import { set } from 'lodash/fp'
import { getDepth } from './listen'

const state = set('data.115.128267.fields.Depth', 10, {})

describe('getDepth', () => {
  test('Get deeply nested value.', () => {
    expect(getDepth(state))
    .toBe(10)
  })
})
