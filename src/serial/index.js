import SerialPort from 'serialport'
import { serialClose, serialData, serialErr, serialOpen } from './actions'

export default function initSerial(dispatcher, options) {
  const { baudRate, devicePath } = options
  console.log('init Serial', devicePath, baudRate)
  const serial = new SerialPort(devicePath, {
    baudRate,
  })
  const handleError = dispatcher(serialErr)
  const handleClose = dispatcher(serialClose)
  const handleOpen = dispatcher(serialOpen)

  function onClose(err) {
    handleClose(err)
    serial.open(handleOpen)
    console.log('Serial is open?', serial.isOpen)
  }
  // Open errors will be emitted as an error event
  serial.on('error', handleError)
  serial.on('close', onClose)
  const parser = new SerialPort.parsers.Readline()
  serial.pipe(parser)
  parser.on('open', handleOpen)
  parser.on('error', handleError)
  parser.on('close', handleClose)
  parser.on('data', dispatcher(serialData))
  console.log('Serial is open?', serial.isOpen)
}
