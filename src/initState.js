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
    aisFeeds: [
      { ip: '5.9.207.224', port: 6636, name: '' },
      { ip: '54.204.25.151', port: 7113, name: '' },
      { ip: '144.76.105.244', port: 2092, name: '' },
    ],
    lanBroadcast: getBroadcast(lanIp),
    lanIp,
    lanPort: 10110,
    navionicsPort: 2000,
  },
  data: {
  },
}
