import { applyMiddleware, createStore } from 'redux'
import reducer from './reducer'
import initState from './initState'
import middleware from './middleware'

export default createStore(reducer, initState, applyMiddleware(middleware))
