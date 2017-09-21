import dgram from 'dgram'

const server = dgram.createSocket('udp4')
server.bind(() => {
  server.setBroadcast(true)
})

export default function sendMsg(message, host, port) {
  const data = Buffer.from(message)
  server.send(data, 0, data.length, port, host, (err) => {
    if (err) throw err
    console.log(message, host, port)
  })
}
