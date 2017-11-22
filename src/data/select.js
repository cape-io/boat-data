import { get, set, reduce } from 'lodash'
import { flow, prop } from 'lodash/fp'

export function reduceSrc(accumulator, pgns, src) {
  return reduce(
    pgns,
    (result, value, pgn) => set(
      set(result, pgn, get(result, pgn, {})),
      [pgn, src],
      value
    ),
    accumulator
  )
}

// Create an index keyed by pgn -> src.
export function keyByPgn(state) {
  return reduce(state, reduceSrc, {})
}

export const getData = prop('data')
export const getPgnSrc = flow(getData, keyByPgn)

// Get specific pgn for each src.
export function getPgn(state, pgn) {
  function pgnReducer(accumulator, value, key) {
    if (value[pgn]) return set(accumulator, key, get(value, pgn))
    return accumulator
  }
  return reduce(getData(state), pgnReducer, {})
}
