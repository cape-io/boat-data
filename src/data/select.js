import { get, set, reduce } from 'lodash'
import { has } from 'lodash/fp'
import { createSelector } from 'reselect'

// Create an index keyed by pgn -> src.
export function keyByPgn(state) {
  const srcReducer = (accumulator, pgns, src) => reduce(
    pgns,
    (result, pgn, value) => set(result, [pgn, src], value),
    accumulator
  )
  return reduce(state, srcReducer, {})
}

export const getPgnSrc = createSelector(get('data'), keyByPgn)

// Get specific pgn for each src.
export function getPgn(pgn) {
  function pgnReducer(accumulator, value, key) {
    if (has(value, pgn)) return set(accumulator, key, get(value, pgn))
    return accumulator
  }
  return state => reduce(state, pgnReducer, {})
}
