import { get } from 'lodash'
import { setIn } from 'cape-lodash'
import { createReducer } from 'cape-redux'
import { ANALYZER_DATA } from '../n2kAnalyzer/actions'

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
  return setIn(path, setPgnSrc(state, payload), payload)
}
export const reducers = {
  [ANALYZER_DATA]: setData,
}
export default createReducer(reducers, {})
