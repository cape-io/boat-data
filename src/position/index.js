import { method } from 'lodash'
import { flow, get } from 'lodash/fp'
import mqtt from 'mqtt'
import { combineReducers, createStore } from 'redux'
import { addListener } from 'cape-redux'
import position from './reducer'
import { positionUpdate, waypointUpdate } from './actions'
import { getLastDist, getSavedPos, getWaypointDistance } from './select'

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

const waypoint = {
  latitude: 43.663086666666665,
  longitude: -70.23708666666667,
}
store.dispatch(waypointUpdate(waypoint))

const getp = get('position')
const getDist = flow(getp, getLastDist)
const getSaved = flow(getp, getSavedPos)
const getSt = method('getState')
const printDist = flow(getSt, getDist, console.log)
const printAlarm = flow(getSt, getp, getWaypointDistance, console.log)

addListener(getDist, store, printDist)
addListener(getSaved, store, printAlarm)
