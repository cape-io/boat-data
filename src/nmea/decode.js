import { method } from 'lodash'
import { flow, head, split, startsWith } from 'lodash/fp'

export const getParts = split(',')
export const getName = flow(getParts, head, method('slice', 1))
export const isAis = startsWith('!')
export const isData = startsWith('$')
