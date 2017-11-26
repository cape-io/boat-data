import { get } from 'lodash/fp'
import { InfluxDB } from 'influx'
import { addListener } from 'cape-redux'
import sendMsg from './broadcast'
import { dbt } from './nmea/encode'
import anchorAlarm from './position/alarm'
import sendSms from './plivo'
import { sendUdpLan, sendUdpNavionics } from './actionHandlerSerial'

const influx = new InfluxDB({
  host: 'localhost',
  database: 'boatdata',
})

// 115 128267
// 35 128267
export const getDepth = get('data.115.128267.fields.Depth')
function sendDepth(reduxStore, meters) {
  const state = reduxStore.getState()
  const sentence = dbt(meters)
  sendMsg(sentence, state.config.lanBroadcast, state.config.navionicsPort)
  sendUdpLan(state.config, sentence)
  sendUdpNavionics(state.config, sentence)
  influx.writePoints([{ measurement: 'depth', fields: { value: meters } }])
  // console.log('depth', meters)
}

export default function init(store) {
  addListener(getDepth, store, sendDepth)
  anchorAlarm(store, sendSms, get('position'))
}
