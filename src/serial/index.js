import SerialPort from 'serialport'
import { serialClose, serialData, serialErr, serialOpen } from './actions'

export default function initSerial(dispatcher, options) {
  const Readline = SerialPort.parsers.Readline
  const parser = new Readline()
  const { baudRate, devicePath } = options
  console.log('init Serial', devicePath, baudRate)
  const serial = new SerialPort(devicePath, {
    baudRate,
  })
  serial.pipe(parser)
  parser.on('open', dispatcher(serialOpen))
  parser.on('error', dispatcher(serialErr))
  parser.on('close', dispatcher(serialClose))
  parser.on('data', dispatcher(serialData))
}
