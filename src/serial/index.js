import SerialPort from 'serialport'
import { serialClose, serialData, serialErr, serialOpen } from './actions'

const Readline = SerialPort.parsers.Readline
const parser = new Readline()

export default function initSerial(dispatcher, options) {
  const { baudRate, devicePath } = options
  console.log('init Serial', devicePath, baudRate)
  const serial = new SerialPort(devicePath, {
    baudRate,
  })
  serial.pipe(parser)
  serial.on('open', dispatcher(serialOpen))
  serial.on('error', dispatcher(serialErr))
  serial.on('close', dispatcher(serialClose))
  serial.on('data', dispatcher(serialData))
}
