import dgram from 'dgram'
import { serialData, serialOpen } from './serial/actions'

export default function listen(dispatcher, port = 10110) {
  const socket = dgram.createSocket('udp4')
  if (!port) {
    return console.error('no port set in configuration.')
  }
  socket.on('listening', () => {
    const address = socket.address()
    console.log(`UDP Server listening on ${address.address}:${address.port}`)
    serialOpen()
  })

  socket.on('message', dispatcher(serialData))
  socket.bind(port)
  return true
}
