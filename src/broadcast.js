import dgram from 'dgram'

const socket = dgram.createSocket('udp4')
socket.bind(() => {
  socket.setBroadcast(true)
})

export default function sendMsg(message, host, port) {
  const data = new Buffer(message)
  socket.send(data, 0, data.length, port, host, (err) => {
    if (err) throw err
    // console.log(message, host, port)
  })
}
