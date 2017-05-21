import { combineReducers } from 'redux'

import analyzer from './n2k/reducer'
import serial from './nmea/reducer'

export default combineReducers({
  analyzer,
  serial,
})
