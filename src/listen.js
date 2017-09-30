import { get } from 'lodash/fp'
import { InfluxDB } from 'influx'
import { addListener } from 'cape-redux'
import { select } from 'cape-select'
import sendMsg from './broadcast'
import { dbt, hdm, mvw } from './nmea/encode'
import anchorAlarm from './position/alarm'
import sendSms from './plivo'
import { sendUdp } from './actionHandlerSerial'

const influx = new InfluxDB({
  host: 'localhost',
  database: 'boatdata',
})

// 115 128267
// 35 128267
export const getDepth = get('data.data.115.128267.fields.Depth')
function sendDepth(reduxStore, meters) {
  const state = reduxStore.getState()
  const sentence = dbt(meters)
  sendMsg(sentence, state.config.lanBroadcast, state.config.navionicsPort)
  sendUdp(state.config, sentence)
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
  // console.log('mvw', sentence)
  sendUdp(state.config, sentence)
  influx.writePoints([{ measurement: 'windSpeed', fields: { value: speed } }])
}

const getHeading = get('data.data.115.127250.fields.Heading')
function sendHeading(reduxStore, heading) {
  const state = reduxStore.getState()
  const sentence = hdm(heading)
  sendUdp(state.config, sentence)
}
export default function init(store) {
  addListener(getDepth, store, sendDepth)
  addListener(getWindSpeed, store, sendWind)
  addListener(getHeading, store, sendHeading)
  anchorAlarm(store, sendSms, get('position'))
}
