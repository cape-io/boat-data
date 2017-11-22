/* globals describe jest test expect */
import state from '../../state.json'
import { getPgn, getPgnSrc, reduceSrc } from './select'

describe('reduceSrc', () => {
  test('src 0.', () => {
    expect(reduceSrc({}, state.data['0'], '0'))
    .toMatchObject({
      262161: { 0: state.data['0']['262161'] },
      262384: { 0: state.data['0']['262384'] },
      262386: { 0: state.data['0']['262386'] },
    })
  })
  test('src 1.', () => {
    expect(reduceSrc({}, state.data['1'], '1'))
    .toMatchObject({ 60928: { 1: state.data['1']['60928'] } })
  })
  test('src 2.', () => {
    expect(reduceSrc({}, state.data['2'], '2'))
    .toMatchObject({ 60928: { 2: state.data['2']['60928'] } })
  })
})

describe('getPgnSrc', () => {
  test('getPgnSrc.', () => {
    expect(getPgnSrc(state))
    .toMatchObject({
      262161: { 0: state.data['0']['262161'] },
      262384: { 0: state.data['0']['262384'] },
      262386: { 0: state.data['0']['262386'] },
      60928: {
        1: state.data['1']['60928'],
        2: state.data['2']['60928'],
      },
      129025: {
        43: state.data['43']['129025'],
        130: state.data['130']['129025'],
      },
    })
  })
})

describe('getPgn', () => {
  test('getPgn.', () => {
    expect(getPgn(state, '60928'))
    .toMatchObject({
      1: state.data['1']['60928'],
      2: state.data['2']['60928'],
      3: state.data['3']['60928'],
      14: state.data['14']['60928'],
      16: state.data['16']['60928'],
      17: state.data['17']['60928'],
    })
  })
})
