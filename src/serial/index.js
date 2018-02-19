import SerialPort from 'serialport'
import { serialClose, serialData, serialErr, serialOpen } from './actions'

export default function initSerial(dispatcher, options) {
  const { baudRate, devicePath } = options
  console.log('init Serial', devicePath, baudRate)
  const handleError = dispatcher(serialErr)
  const handleClose = dispatcher(serialClose)
  const handleOpen = dispatcher(serialOpen)
  const parser = new SerialPort.parsers.Readline()

  let serial = null
  function cleanup() {
    if (serial === null) return
    serial.unpipe(parser)
    serial.removeAllListeners()
    serial = null
  }
  function start() {
    cleanup()
    serial = new SerialPort(devicePath, {
      baudRate,
    })
    function onClose(err) {
      handleClose(err)
      start()
    }
    serial.on('error', handleError)
    serial.on('close', onClose)
    serial.pipe(parser)
  }

  parser.on('open', handleOpen)
  parser.on('error', handleError)
  parser.on('close', handleClose)
  parser.on('data', dispatcher(serialData))
  start()
  // console.log('Serial is open?', serial.isOpen)
}
