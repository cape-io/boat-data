import SerialPort from 'serialport'
import { serialClose, serialData, serialErr, serialOpen } from './actions'

export default function initSerial(dispatcher, options) {
  const Readline = SerialPort.parsers.Readline
  const { baudRate, devicePath } = options
  console.log('init Serial', devicePath, baudRate)
  const serial = new SerialPort(devicePath, {
    baudRate,
  })
  const handleError = dispatcher(serialErr)
  const handleClose = dispatcher(serialClose)
  // Open errors will be emitted as an error event
  serial.on('error', handleError)
  serial.on('close', handleClose)
  const parser = new Readline()
  serial.pipe(parser)
  parser.on('open', dispatcher(serialOpen))
  parser.on('error', handleError)
  parser.on('close', handleClose)
  parser.on('data', dispatcher(serialData))
  console.log('Serial is open?', serial.isOpen)
}
