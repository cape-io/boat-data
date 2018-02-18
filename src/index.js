import { dispatcher } from 'cape-redux'
import initAnalyzer from './n2kAnalyzer'
import initSerial from './serial'
import initState from './initState'

import createStore from './createStore'
import server from './server'
import tcpServer from './tcp/connect'
import listeners from './listen'
import { limitSrc } from './position/actions'

const store = createStore(initState)
store.dispatch(limitSrc(130))

const dispatch = dispatcher(store.dispatch)
const state = store.getState()
// console.log(state)
initAnalyzer(dispatch, state.analyzer.devicePath)
initSerial(dispatch, state.ais)
server(store)
listeners(store)
tcpServer()
// setInterval(() => {
//   console.log(JSON.stringify(store.getState().data, null, 2))
// }, 3000)
