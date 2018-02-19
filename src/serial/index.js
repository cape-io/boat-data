import SerialPort from 'serialport'
import {
  parserClose, parserErr, parserOpen,
  serialClose, serialData, serialErr, serialOpen,
} from './actions'

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
    console.log('serial cleared', devicePath)
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
    function onOpen() {
      serial.pipe(parser)
      handleOpen()
    }
    serial.on('error', handleError)
    serial.on('close', onClose)
    serial.on('open', onOpen)
  }
  console.log(parserOpen)
  parser.on('open', dispatcher(parserOpen))
  parser.on('error', dispatcher(parserErr))
  parser.on('close', dispatcher(parserClose))
  parser.on('data', dispatcher(serialData))
  start()
  // console.log('Serial is open?', serial.isOpen)
}
