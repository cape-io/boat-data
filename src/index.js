import { dispatcher } from 'cape-redux'
import initAnalyzer from './n2kAnalyzer'
import initSerial from './serial'

import store from './createStore'
import server from './server'
import listeners from './listen'

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
