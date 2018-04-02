import {
  conforms, matchesProperty, propertyOf, set,
} from 'lodash/fp'
import { isTrue } from 'cape-lodash'
import { aisTalkers, msgTypes } from './ais-info'
import { decode, toByteArray } from './base64'
import { get32 } from './bits'

export const isAis = conforms({
  isEncapsulated: isTrue,
  fields: matchesProperty('length', 6),
  talker: propertyOf(aisTalkers),
})
// 'Sync', 'SlotIncrement', 'SlotCount', 'Keep'

export function decodePayload(payload) {
  const msgType = decode.get(payload.charAt(0))
  const info = msgTypes.get(msgType)
  const binary = toByteArray(payload)
  function reducer(result, { id, start, len, processor }) {
    return set(id, processor(get32(binary, start, len)), result)
  }
  return info.fields.reduce(reducer, {})
}
// export const decode = flow(aisDecode, omitBy(overSome([isFunction, isArray, isBuffer])))

// export const aisData = flow(
//   // decode,
//   renamePick({
//     class: 'class',
//     channel: 'channel',
//     mmsi: 'mmsi',
//     shipname: 'shipname',
//     sog: 'speedOverGround',
//     cog: 'courseOverGroundTrue',
//     hdg: 'headingTrue',
//     lon: 'longitude',
//     lat: 'latitude',
//     length: 'length',
//     width: 'beam',
//     draught: 'draft',
//     aidtype: 'aidtype',
//     cargo: 'cargo',
//     dimA: 'fromBow',
//     dimD: 'fromSide',
//     status: 'status',
//     navstatus: 'navstatus',
//     destination: 'destination',
//     callsign: 'callsign',
//   })
// )

// encode AIS message
// export function createPositionReportMessage({ mmsi, lat, lon, sog, cog, hdg, seconds, utc }) {
//   const now = new Date()
//   // console.log('time', utc, seconds)
//   return new AisEncode({
//     aistype: 18, // class B position report
//     repeat: 0,
//     accuracy: 0, // 0 = regular GPS, 1 = DGPS
//     dsc: 1,
//     seconds: utc || seconds || now.getUTCSeconds(),
//     mmsi,
//     sog,
//     lon,
//     lat,
//     cog,
//     hdg,
//   }).nmea
// }
// export const convertVdoToVdm = flow(
//   sentence => new AisDecode(sentence),
//   createPositionReportMessage,
// )
