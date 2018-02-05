import SerialPort from 'serialport'
import { overEvery } from 'lodash/fp'
import { serialClose, serialData, serialErr, serialOpen } from './actions'

export default function initSerial(dispatcher, options) {
  const Readline = SerialPort.parsers.Readline
  const parser = new Readline()
  const { baudRate, devicePath } = options
  console.log('init Serial', devicePath, baudRate)
  const serial = new SerialPort(devicePath, {
    baudRate,
  })
  const handleError = overEvery([console.error, dispatcher(serialErr)])
  handleError('testing')
  // Open errors will be emitted as an error event
  serial.on('error', handleError)
  serial.pipe(parser)
  parser.on('open', dispatcher(serialOpen))
  parser.on('error', handleError)
  parser.on('close', dispatcher(serialClose))
  parser.on('data', dispatcher(serialData))
}
