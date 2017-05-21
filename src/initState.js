import { method } from 'lodash'
import { flow, initial, join, split } from 'lodash/fp'
import { ip } from 'address'

const lanIp = ip()
const getBroadcast = flow(split('.'), initial, method('concat', ['255']), join('.'))

export default {
  ais: {
    devicePath: '/dev/ttyACM0',
  },
  analyzer: {
    devicePath: '/dev/ttyUSB0',
    //devicePath: '/dev/tty.usbserial-2D80F',
  },
  config: {
    lanBroadcast: getBroadcast(lanIp),
    lanIp,
  },
  data: {
  },
}
