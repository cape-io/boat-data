import { property } from 'lodash'
import { addListener, dispatcher } from 'cape-redux'
import initAnalyzer from './n2kAnalyzer'
import initSerial from './serial'
import sendMsg from './broadcast'
import { dbt } from './nmea/encode'
import store from './createStore'

const dispatch = dispatcher(store.dispatch)
const state = store.getState()

initAnalyzer(dispatch, state.analyzer.devicePath)
initSerial(dispatch, state.serial)

// 115 128267
// 35 128267
const getDepth = property('data.115.128267.fields.Depth')
function sendDepth(reduxStore, meters) {
  sendMsg(dbt(meters), state.config.lanBroadcast, state.config.navionicsPort)
  sendMsg(dbt(meters), state.config.lanBroadcast, state.config.lanPort)
}
addListener(getDepth, store, sendDepth)

// setInterval(() => {
//   console.log(JSON.stringify(store.getState().analyzer.data, null, 2))
// }, 3000)
