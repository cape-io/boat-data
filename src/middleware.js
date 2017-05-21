import { createMiddleware } from 'cape-redux'
import { SERIAL_DATA } from './serial/actions'
import { handleSerialData } from './actionHandlers'

export const dispatcher = {
  [SERIAL_DATA]: handleSerialData,
}

export default createMiddleware(dispatcher)
