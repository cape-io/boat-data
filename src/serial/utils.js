import { method, startsWith } from 'lodash/fp'

export const getName = method('slice', 1, 6)
export const isAis = startsWith('!')
export const isData = startsWith('$')
