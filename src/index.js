import { flow, property } from 'lodash'
import { createStore } from 'redux'
import { addListener } from 'cape-redux'
import initAnalyzer from './n2kAnalyzer'
import initSerial from './serial'
import sendMsg from './broadcast'
import { dbt } from './nmea/encode'
import reducer from './reducer'

const store = createStore(reducer, {})
const dispatcher = action => flow(action, store.dispatch)

initAnalyzer(dispatcher)
initSerial(dispatcher)

// 115 128267
// 35 128267
const getDepth = property('analyzer.data.115.128267.fields.Depth')
function sendDepth(reduxStore, meters) {
  sendMsg(dbt(meters))
}
addListener(getDepth, store, sendDepth)

// setInterval(() => {
//   console.log(JSON.stringify(store.getState().analyzer.data, null, 2))
// }, 3000)
