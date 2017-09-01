import { get } from 'lodash/fp'
import { InfluxDB } from 'influx'
import { addListener } from 'cape-redux'
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
const getWindSpeed = get('data.data.115.130306.fields')
function sendWind(reduxStore, fields) {
  const state = reduxStore.getState()
  const speed = fields['Wind Speed']
  const angle = fields['Wind Angle']
  const sentence = mvw({ angle, reference: 'R', speed, unit: 'M' })
  console.log('mvw', sentence)
  sendMsg(sentence, state.config.lanBroadcast, state.config.navionicsPort)
  influx.writePoints([{ measurement: 'windSpeed', fields: { value: speed } }])
}
export default function init(store) {
  addListener(getDepth, store, sendDepth)
  addListener(getWindSpeed, store, sendWind)
}
