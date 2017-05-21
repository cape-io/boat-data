import { flow } from 'lodash'
import { setKey, setKeyVal } from 'cape-lodash'
import { createReducer } from 'cape-redux'
import { ANALYZER_CLOSE, ANALYZER_ERROR, ANALYZER_DATA } from './actions'

const defaultState = {
  devicePath: null, // '/dev/tty.usbserial-2D80F'
  errorMsg: null,
  isRunning: false,
  pgnSrc: {},
}
export const setClosed = setKeyVal('isRunning', false)
export const setError = setKey('errorMsg')
export const setRunning = setKeyVal('isRunning', true)

export function ensureRunning(state) {
  return (state.isRunning && state) || setRunning(state)
}
export const setClose = flow(setError, setClosed)

export const reducers = {
  [ANALYZER_CLOSE]: setClose,
  [ANALYZER_ERROR]: setError,
  [ANALYZER_DATA]: ensureRunning,
}
export default createReducer(reducers, defaultState)
