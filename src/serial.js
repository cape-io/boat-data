import SerialPort from 'serialport'
import { defaults } from 'lodash'
import { serialClose, serialData, serialErr, serialOpen } from './actions'
import sendMsg from './broadcast'

const defaultOptions = {
  device: '/dev/ttyACM0',
  baudRate: 38400,
}

export default function initSerial(dispatcher, options = {}) {
  const { device, ...opts } = defaults(options, defaultOptions)
  const serial = new SerialPort(device, {
    ...opts,
    parser: SerialPort.parsers.readline('\n'),
  })
  serial.on('open', dispatcher(serialOpen))
  serial.on('error', dispatcher(serialErr))
  serial.on('close', dispatcher(serialClose))
  // serial.on('data', dispatcher(serialData))
  serial.on('data', sendMsg)
}
