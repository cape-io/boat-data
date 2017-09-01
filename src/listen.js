import { get } from 'lodash/fp'
import { InfluxDB } from 'influx'
import { addListener } from 'cape-redux'
import { select } from 'cape-select'
import sendMsg from './broadcast'
import { dbt, mvw } from './nmea/encode'

const influx = new InfluxDB({
  host: 'localhost',
  database: 'boatdata',
})

// 115 128267
// 35 128267
const getDepth = get('data.data.115.128267.fields.Depth')
function sendDepth(reduxStore, meters) {
  const state = reduxStore.getState()
  sendMsg(dbt(meters), state.config.lanBroadcast, state.config.navionicsPort)
  sendMsg(dbt(meters), state.config.lanBroadcast, state.config.lanPort)
  influx.writePoints([{ measurement: 'depth', fields: { value: meters } }])
  // console.log('depth', meters)
}
const getWind = get('data.data.115.130306.fields')
const getWindSpeed = select(getWind, 'Wind Speed')
const getWindAngle = select(getWind, 'Wind Angle')
function sendWind(reduxStore, speed) {
  const state = reduxStore.getState()
  const angle = getWindAngle(state)
  const sentence = mvw({ angle, reference: 'R', speed, unit: 'M' })
  console.log('mvw', sentence)
  sendMsg(sentence, state.config.lanBroadcast, state.config.navionicsPort)
  influx.writePoints([{ measurement: 'windSpeed', fields: { value: speed } }])
}
export default function init(store) {
  addListener(getDepth, store, sendDepth)
  addListener(getWindSpeed, store, sendWind)
}
