import { curry } from 'lodash'
import mqtt from 'mqtt'

const client = mqtt.connect('mqtt://beaglebone.lan')
// 1883

let connected = false

client.on('connect', () => {
  client.subscribe('#')
  connected = true
})

export const publish = curry((topic, message) => {
  if (!connected) return false
  return client.publish(topic, message)
})

export const id = 'b0d5ccf4a26e'
