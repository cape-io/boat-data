import { get } from 'lodash'
import { setIn } from 'cape-lodash'

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
