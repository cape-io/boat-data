import { get } from 'lodash/fp'
// import sendMsg from './broadcast'
import anchorAlarm from './position/alarm'
// import sendSms from './plivo'
// import { sendUdpLan, sendUdpNavionics } from './actionHandlerSerial'
// import { addListener } from 'cape-redux'

// 115 128267
// 35 128267
export const getDepth = get('data.115.128267.fields.Depth')


export default function init(store) {
  // addListener(getDepth, store, sendDepth)
  // anchorAlarm(store, sendSms, get('position'))
}
