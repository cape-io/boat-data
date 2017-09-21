import { dispatcher } from 'cape-redux'
import createStore from '../createStore'
import udpListen from '../udpListen'
import tcpServer from '../tcp/connect'
import httpServer from '../server'
import initState from './initState'

const store = createStore(initState)
const dispatch = dispatcher(store.dispatch)
const port = store.getState().config.udpListen
udpListen(dispatch, port)
tcpServer()
httpServer(store)
