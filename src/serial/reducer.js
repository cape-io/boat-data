import { flow } from 'lodash'
import { mergeWith, setKey, setKeyVal } from 'cape-lodash'
import { createReducer } from 'cape-redux'
import { SERIAL_CLOSE, SERIAL_ERROR, SERIAL_OPEN } from './actions'

const defaultState = {
  baudRate: 38400,
  devicePath: null,
  errorMsg: null,
  isOpen: false,
  isRunning: false,
}

export const setClosed = mergeWith({ isOpen: false, isRunning: false })
export const setError = setKey('errorMsg')
export const setOpen = setKeyVal('isOpen', true)
export const setRunning = setKeyVal('isRunning', true)

export function ensureRunning(state) {
  return (state.isRunning && state) || setRunning(state)
}
export const setClose = flow(setError, setClosed)

export const reducers = {
  [SERIAL_CLOSE]: setClose,
  [SERIAL_OPEN]: setOpen,
  [SERIAL_ERROR]: flow(setError, setClosed),
}
export default createReducer(reducers, defaultState)
