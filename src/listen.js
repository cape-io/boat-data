import { property } from 'lodash'
import { InfluxDB } from 'influx'
import { addListener } from 'cape-redux'
import sendMsg from './broadcast'
import { dbt } from './nmea/encode'

const influx = new InfluxDB({
  host: 'localhost',
  database: 'boatdata',
})

// 115 128267
// 35 128267
const getDepth = property('data.data.115.128267.fields.Depth')
function sendDepth(reduxStore, meters) {
  const state = reduxStore.getState()
  sendMsg(dbt(meters), state.config.lanBroadcast, state.config.navionicsPort)
  sendMsg(dbt(meters), state.config.lanBroadcast, state.config.lanPort)
  influx.writePoints([{ measurement: 'depth', fields: { value: meters } }])
  // console.log('depth', meters)
}
const getWindSpeed = property('data.data.115.130306.fields.Wind Speed')
function sendWind(reduxStore, value) {
  influx.writePoints([{ measurement: 'windSpeed', fields: { value } }])
}
export default function init(store) {
  addListener(getDepth, store, sendDepth)
  addListener(getWindSpeed, store, sendWind)
}
