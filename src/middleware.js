import { createMiddleware } from 'cape-redux'
import { SERIAL_DATA } from './serial/actions'
import { ANALYZER_DATA } from './n2kAnalyzer/actions'
import { handleAnalyzer } from './actionHandlers'
import handleSerialData from './actionHandlerSerial'

export const dispatcher = {
  [ANALYZER_DATA]: handleAnalyzer,
  [SERIAL_DATA]: handleSerialData,
}

export default createMiddleware(dispatcher)
