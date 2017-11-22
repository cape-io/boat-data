// import { get, reduce } from 'lodash'
// import { flow, prop, pick } from 'lodash/fp'
import { setIn } from 'cape-lodash'
import { createReducer } from 'cape-redux'
import { ANALYZER_DATA } from '../n2kAnalyzer/actions'

// Creates pgnSrc 'description' field for each PGN.
// export function setPngDescription(state, payload) {
//   const path = ['pgnSrc', payload.pgn, 'description']
//   if (!get(path)) return setIn(path, state, payload.description)
//   return state
// }
// // Creates pgnSrc 'src' field for each PGN. The device that transmits the type of sentence.
// export function setPgnSrc(state, payload) {
//   const path = ['pgnSrc', payload.pgn, 'src', payload.src]
//   if (!get(path)) return setIn(path, setPngDescription(state, payload), true)
//   return state
// }
// // Creates ''
// export const getSrcInfo = flow(prop('fields'), pick(['Product Code', 'Model ID']))
// export function setSrcInfo(state, payload) {
//   setIn(['src', payload.src], state, )
// }

export function setData(state, payload) {
  return setIn([payload.src, payload.pgn], state, payload)
}
export const reducers = {
  [ANALYZER_DATA]: setData,
}
export default createReducer(reducers, {})
