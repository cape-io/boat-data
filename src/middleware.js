import { isFunction } from 'lodash'
import { SERIAL_DATA } from './actions'
import { handleSerialData } from './actionHandlers'

export const dispatcher = {
  [SERIAL_DATA]: handleSerialData,
}

export default function fireMiddleware(firebase, handlers = {}) {
  const actions = {
    ...dispatcher,
    ...handlers,
  }
  return store => next => (action) => {
    if (!action.type) return next(action)
    if (isFunction(actions[action.type])) {
      return actions[action.type]({ action, next, store })
    }
    return next(action)
  }
}
