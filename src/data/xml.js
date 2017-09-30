import { get, forEach } from 'lodash/fp'
import { readFile } from 'fs'
import { promisify } from 'util'
import { parseString } from 'xml2js'
import { create } from 'axios'
// import { alarmDistance, waypointUpdate } from '../position/actions'

const readXml = promisify(readFile)
const parseXml = promisify(parseString)
const fetch = create({
  baseURL: 'http://farana.lan:3001/position/',
  timeout: 2000,
})

export function parseVrm({ latitude, longitude, range }) {
  return {
    waypoint: { latitude, longitude },
    meters: parseFloat(range) * 1852,
  }
}

export default readXml(`${__dirname}/../../data/SEAiq_VRM.tools`)
.then(res => parseXml(res, { explicitArray: false }))
.then(get('tools.vrm'))
.then(parseVrm)
.then(({ waypoint: { latitude, longitude }, meters }) => Promise.all([
  fetch(`alarm/distance/${meters}`),
  fetch(`waypoint/${latitude}/${longitude}`),
]))
.then(forEach(({ config, data, status }) =>
  console.log(JSON.stringify({ ...data, url: config.url, status }, null, 2))
))
.catch(console.error)

// mosquitto_sub -v -I myclient_ -t '#' -h mqtt.victronenergy.com -u victron@kaicurry.com -P bXM-2Am-HyD-4cc --cafile venus-ca.crt -p 8883
