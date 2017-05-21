import SerialPort from 'serialport'
import { serialClose, serialData, serialErr, serialOpen } from './actions'

export default function initSerial(dispatcher, options) {
  const { baudRate, devicePath } = options
  const serial = new SerialPort(devicePath, {
    baudRate,
    parser: SerialPort.parsers.readline('\n'),
  })
  serial.on('open', dispatcher(serialOpen))
  serial.on('error', dispatcher(serialErr))
  serial.on('close', dispatcher(serialClose))
  serial.on('data', dispatcher(serialData))
}
