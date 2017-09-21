import { applyMiddleware, createStore } from 'redux'
import reducer from './reducer'
import middleware from './middleware'

export default initState => createStore(reducer, initState, applyMiddleware(middleware))
