import { dispatcher } from 'cape-redux'
import initAnalyzer from './n2kAnalyzer'
import initSerial from './serial'

import store from './createStore'
import server from './server'
import listeners from './listen'
import { alarmDistance, limitSrc, waypointUpdate } from './position/actions'

const waypoint = {
  latitude: 38.96364, // 38.9634659, 38.963588
  longitude: -76.480966, // -76.4809707, -76.481038
}
store.dispatch(waypointUpdate(waypoint))
store.dispatch(limitSrc(130))
store.dispatch(alarmDistance(21.4))

const dispatch = dispatcher(store.dispatch)
const state = store.getState()
console.log(state)
initAnalyzer(dispatch, state.analyzer.devicePath)
initSerial(dispatch, state.ais)
server(store)
listeners(store)

// setInterval(() => {
//   console.log(JSON.stringify(store.getState().data, null, 2))
// }, 3000)
