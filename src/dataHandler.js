import { influx, sendUdp, sendUdpNavionics } from './broadcast'
import { dbt, mvw } from './nmea/encode'

export function sendDepth(config, meters) {
  // Do not send really deep readings because they are probably wrong.
  if (meters > 145) return
  const sentence = dbt(meters)
  sendUdp(config, { name: 'DBT', sentence })
  sendUdpNavionics(config, sentence)
  influx.writePoints([{ measurement: 'depth', fields: { value: meters } }])
  // console.log('depth', meters)
}
export function sendWind(config, angle, speed) {
  const sentence = mvw({
    angle,
    reference: 'R',
    speed,
    unit: 'M',
  })
  sendUdp(config, { name: 'DBT', sentence })
  influx.writePoints([{ measurement: 'windSpeed', fields: { value: speed } }])
}
