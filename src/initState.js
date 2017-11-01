import { method } from 'lodash'
import { flow, initial, join, split } from 'lodash/fp'
import { ip } from 'address'

const lanIp = ip()
const getBroadcast = flow(split('.'), initial, method('concat', ['255']), join('.'))

export default {
  ais: {
    baudRate: 38400,
    devicePath: '/dev/ttyACM0',
  },
  analyzer: {
    devicePath: '/dev/ttyUSB0',
    //devicePath: '/dev/tty.usbserial-2D80F',
  },
  config: {
    // aisFeeds: [],
    lanBroadcast: getBroadcast(lanIp),
    lanIp,
    lanPort: 10112,
    navionicsPort: 2000,
    wanBroadcast: '50.116.20.28', // Dong
    wanPort: 10110,
  },
  data: {
  },
}
