import { flow } from 'lodash'
import { mergeWith, setIn, setKey, setKeyVal } from 'cape-lodash'
import { createReducer } from 'cape-redux'
import {
  PARSER_COSE, PARSER_OPEN,
  SERIAL_CLOSE, SERIAL_DATA, SERIAL_ERROR, SERIAL_OPEN,
} from './actions'

const defaultState = {
  baudRate: null, // 38400,
  command: null,
  devicePath: null,
  errorMsg: null,
  isOpen: false,
  isRunning: false,
  isStarting: false,
  parserOpen: false,
}

export const setClosed = mergeWith({ isOpen: false, isRunning: false })
export const setError = setKey('errorMsg')
export const setOpen = setKeyVal('isOpen', true)
export const setRunning = setKeyVal('isRunning', true)

export function ensureRunning(state) {
  return (state.isRunning && state) || setRunning(state)
}
export const setClose = flow(setError, setClosed)

export function setData(state, { name, sentence }) {
  return setIn(['data', name], state, sentence)
}

export const reducers = {
  [SERIAL_CLOSE]: setClose,
  [PARSER_COSE]: mergeWith({ parserOpen: false }),
  [SERIAL_DATA]: flow(setData, ensureRunning),
  [SERIAL_OPEN]: setOpen,
  [PARSER_OPEN]: setKeyVal('parserOpen', true),
  [SERIAL_ERROR]: flow(setError, setClosed),
}
export default createReducer(reducers, defaultState)
