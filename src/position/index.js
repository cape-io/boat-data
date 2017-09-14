
import mqtt from 'mqtt'
import { combineReducers, createStore } from 'redux'
import position from './reducer'
import { positionUpdate, waypointUpdate } from './actions'

const client = mqtt.connect('mqtt://beaglebone.lan')

client.on('connect', () => {
  client.subscribe('#')
  console.log('connected')
})

export const reducer = combineReducers({
  position,
})

export const store = createStore(reducer)

client.on('message', (topic, message) => {
  if (topic === 'gps') {
    // console.log(JSON.parse(message))
    store.dispatch(positionUpdate(JSON.parse(message)))
  }
})
