/* globals describe jest test expect */
import { getMsg, messageFalse, messageTrue } from './alarm'

describe('getMsg', () => {
  test('Get msg based on true of false.', () => {
    expect(getMsg(true)).toBe(messageTrue)
    expect(getMsg(false)).toBe(messageFalse)
  })
})
