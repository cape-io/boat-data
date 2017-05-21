import SerialPort from 'serialport'
import { defaults } from 'lodash'
import { serialClose, serialData, serialErr, serialOpen } from './actions'

const defaultOptions = {
  baudRate: 38400,
  devicePath: null,
  open: false,
  starting: false,
}

export default function initSerial(dispatcher, options = {}) {
  const { device, ...opts } = defaults(options, defaultOptions)
  console.log('initSerial', options)
  const serial = new SerialPort(device, {
    ...opts,
    parser: SerialPort.parsers.readline('\n'),
  })
  serial.on('open', dispatcher(serialOpen))
  serial.on('error', dispatcher(serialErr))
  serial.on('close', dispatcher(serialClose))
  serial.on('data', dispatcher(serialData))
}
