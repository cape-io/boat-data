import { flow, get } from 'lodash'
import { setIn, setKey, setKeyVal } from 'cape-lodash'
import { createReducer } from 'cape-redux'
import { ANALYZER_CLOSE, ANALYZER_ERROR, ANALYZER_JSON } from './actions'

const defaultState = {
  data: {},
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

export function setPngDescription(state, payload) {
  const path = ['pgnSrc', payload.pgn, 'description']
  if (!get(path)) return setIn(path, state, payload.description)
  return state
}

export function setPgnSrc(state, payload) {
  const path = ['pgnSrc', payload.pgn, 'src', payload.src]
  if (!get(path)) return setIn(path, setPngDescription(state, payload), true)
  return state
}

export function setData(state, payload) {
  const path = ['data', payload.src, payload.pgn]
  return setIn(path, setPgnSrc(ensureRunning(state), payload), payload)
}
export const reducers = {
  [ANALYZER_CLOSE]: setClose,
  [ANALYZER_ERROR]: setError,
  [ANALYZER_JSON]: setData,
}
export default createReducer(reducers, defaultState)
