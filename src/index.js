import { flow } from 'lodash'
import { combineReducers, createStore } from 'redux'
import analyzer from './reducer'
import initAnalyzer from './analyzer'

const reducer = combineReducers({ analyzer })
const store = createStore(reducer, {})
const dispatcher = action => flow(action, store.dispatch)

initAnalyzer(dispatcher)

setInterval(() => {
  console.log(JSON.stringify(store.getState().analyzer.pgnSrc, null, 2))
}, 3000)
