import {
  conforms, matchesProperty, propertyOf, set,
} from 'lodash/fp'
import { isTrue } from 'cape-lodash'
import { aisTalkers, msgTypes } from './ais-info'
import { payloadLookup, toByteArray } from './base64'
import { get32 } from './bits'

export const isAis = conforms({
  isEncapsulated: isTrue,
  fields: matchesProperty('length', 6),
  talker: propertyOf(aisTalkers),
})
// 'Sync', 'SlotIncrement', 'SlotCount', 'Keep'

export function decodePayload(payload) {
  const msgType = payloadLookup.byChar.get(payload.charAt(0))
  const info = msgTypes.get(msgType)
  const binary = toByteArray(payload)
  function reducer(result, { id, start, len, processor }) {
    return set(id, processor(get32(binary, start, len)), result)
  }
  return info.fields.reduce(reducer, {})
}
// export const decode = flow(aisDecode, omitBy(overSome([isFunction, isArray, isBuffer])))

// const convertVdoToVdm = flow(
//   replace('!AIVDO', 'AIVDM'),
//   split('*'),
//   head,
//   over([addBang, nmeaUtils.getChecksum]),
//   join('*'),
// )
