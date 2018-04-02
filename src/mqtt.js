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

// 525  history | grep mosquitto_sub
// 526  mosquitto_sub -v -h beaglebone.lan -p 1883 -t '#'
// 527  mosquitto_sub -v -I myclient_ -h beaglebone.lan -p 1883 -t '#'
// 528  mosquitto_sub -v -I myclient_ -c -h beaglebone.lan -p 1883 -t '#'
// 529  mosquitto_sub --help
// 531  mosquitto_sub -v -I myclient_ -c -t '#' -h mqtt.victronenergy.com -u victron@kaicurry.com -P bXM-2Am-HyD-4cc --cafile venus-ca.crt -p 8883
// 532  mosquitto_sub -v -c -I myclient_ -t '#' -h mqtt.victronenergy.com -u victron@kaicurry.com -P bXM-2Am-HyD-4cc --cafile venus-ca.crt -p 8883
// 533  mosquitto_sub -v -I myclient_ -t '#' -h mqtt.victronenergy.com -u victron@kaicurry.com -P bXM-2Am-HyD-4cc --cafile venus-ca.crt -p 8883
// 534  history | grep mosq
// 535   mosquitto_sub -v -h beaglebone.lan -p 1883 -t '#'

// mosquitto_pub -h beaglebone.lan -p 1883 -t R/b0d5ccf4a26e/system/0/Serial
// mosquitto_pub -h beaglebone.lan -p 1883 -t R/b0d5ccf4a26e/gps/0/Position
// mosquitto_pub -h beaglebone.lan -p 1883 -t W/b0d5ccf4a26e/system/0/Relay/0/State -m '{"value": 1}'
// N/b0d5ccf4a26e/gps/0/Position/Latitude {"value": 38.962806701660156}
// N/b0d5ccf4a26e/gps/0/Position/Longitude {"value": -76.481643676757812}
// N/b0d5ccf4a26e/gps/0/Position/Latitude {"value": 38.962512969970703}
// N/b0d5ccf4a26e/gps/0/Position/Longitude {"value": -76.481857299804688}
