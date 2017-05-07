import { flow, property } from 'lodash'
import { combineReducers, createStore } from 'redux'
import { addListener } from 'cape-redux'
import analyzer from './reducer'
import initAnalyzer from './analyzer'
import sendMsg from './broadcast'
import { dbt } from './nmea0183'

const reducer = combineReducers({ analyzer })
const store = createStore(reducer, {})
const dispatcher = action => flow(action, store.dispatch)

initAnalyzer(dispatcher)

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
