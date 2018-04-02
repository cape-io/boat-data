import {
  conforms, flow, isArray, isBuffer, isFunction,
  matchesProperty, overSome, omitBy, propertyOf,
} from 'lodash/fp'
import { isTrue, renamePick } from 'cape-lodash'
import { AisDecode, AisEncode } from 'ggencoder'
import { aisTalkers } from './ais-info'

export const isAis = conforms({
  isEncapsulated: isTrue,
  fields: matchesProperty('length', 6),
  talker: propertyOf(aisTalkers),
})
// 'Sync', 'SlotIncrement', 'SlotCount', 'Keep'

export const aisDecode = sentence => new AisDecode(sentence)
export const decode = flow(aisDecode, omitBy(overSome([isFunction, isArray, isBuffer])))

export const aisData = flow(
  decode,
  renamePick({
    aistype: 'type',
    class: 'class',
    channel: 'channel',
    mmsi: 'mmsi',
    shipname: 'shipname',
    sog: 'speedOverGround',
    cog: 'courseOverGroundTrue',
    hdg: 'headingTrue',
    lon: 'longitude',
    lat: 'latitude',
    length: 'length',
    width: 'beam',
    draught: 'draft',
    aidtype: 'aidtype',
    cargo: 'cargo',
    dimA: 'fromBow',
    dimD: 'fromSide',
    status: 'status',
    navstatus: 'navstatus',
    destination: 'destination',
    callsign: 'callsign',
  })
)

// encode AIS message
export function createPositionReportMessage({ mmsi, lat, lon, sog, cog, hdg, seconds, utc }) {
  const now = new Date()
  // console.log('time', utc, seconds)
  return new AisEncode({
    aistype: 18, // class B position report
    repeat: 0,
    accuracy: 0, // 0 = regular GPS, 1 = DGPS
    dsc: 1,
    seconds: utc || seconds || now.getUTCSeconds(),
    mmsi,
    sog,
    lon,
    lat,
    cog,
    hdg,
  }).nmea
}
export const convertVdoToVdm = flow(
  sentence => new AisDecode(sentence),
  createPositionReportMessage,
)
