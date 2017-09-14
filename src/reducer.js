import { defaultTo } from 'lodash/fp'
import { combineReducers } from 'redux'

import analyzer from './n2kAnalyzer/reducer'
import data from './data/reducer'
import ais from './serial/reducer'
import position from './position/reducer'

export const config = defaultTo({})

export default combineReducers({
  ais,
  analyzer,
  config,
  data,
  position,
})
