import net from 'net'
import PubSub from 'pubsub-js'

export default function init() {
  const server = net.createServer()

  function handleConnection(conn) {
    const remoteAddress = `${conn.remoteAddress}:${conn.remotePort}`
    console.log('new client connection from %s', remoteAddress)

    // Listens for data via PubSub
    const subToken = PubSub.subscribe('serial', (msg, { sentence }) =>
      sentence && conn.write(sentence))

    function onConnData(data) {
      console.log('connection data from %s: %j', remoteAddress, data)
      conn.write(data)
    }

    function onConnClose() {
      PubSub.unsubscribe(subToken)
      console.log('connection from %s closed', remoteAddress)
    }

    function onConnError(err) {
      console.log('Connection %s error: %s', remoteAddress, err.message)
    }
    conn.on('data', onConnData)
    conn.once('close', onConnClose)
    conn.on('error', onConnError)
  }
  server.on('connection', handleConnection)

  server.listen(3033, () => console.log('server listening to %j', server.address()))
}
