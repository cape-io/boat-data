import dgram from 'dgram'

const socket = dgram.createSocket('udp4')

socket.on('listening', () => {
  const address = socket.address()
  console.log(`UDP Server listening on ${address.address}:${address.port}`)
})

socket.on('message', (message, remote) => {
  console.log(`${remote.address}:${remote.port} - ${message}`)
  // console.log(message)
  // process.stdout.write(message)
})
socket.bind(10110)
