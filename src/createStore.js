import { applyMiddleware, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncNodeStorage } from 'redux-persist-node-storage'

import reducer from './reducer'
import middleware from './middleware'

const storage = new AsyncNodeStorage('/tmp/redux')
const config = {
  key: 'boatData', // key is required
  storage, // storage is now required
  throttle: 90000,
}

export default function configureStore(initState) {
  const store = createStore(
    persistReducer(config, reducer),
    initState,
    applyMiddleware(middleware)
  )
  return {
    store,
    persistor: persistStore(store),
  }
}
