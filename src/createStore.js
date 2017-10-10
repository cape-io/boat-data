import { applyMiddleware, createStore } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import { AsyncNodeStorage } from 'redux-persist-node-storage'

import reducer from './reducer'
import middleware from './middleware'

export default function configureStore(initState) {
  const store = createStore(
    reducer,
    initState,
    applyMiddleware(middleware)
  )
  return store
}
