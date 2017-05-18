import dgram from 'dgram'

const PORT = 2000
const HOST = '192.168.14.255'

const socket = dgram.createSocket('udp4')
socket.bind(() => {
  socket.setBroadcast(true)
})

export default function sendMsg(message, host = HOST, port = PORT) {
  const data = new Buffer(message)
  socket.send(data, 0, data.length, port, host, (err) => {
    if (err) throw err
    // console.log('UDP message sent to ' + HOST + ':' + PORT)
    console.log(message, host, port)
  })
}
