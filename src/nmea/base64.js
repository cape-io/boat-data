import { flatten, flow, identity, join, map, range, spread, trimEnd, zip } from 'lodash/fp'
import { structuredSelector } from 'cape-select'
import { setWith } from 'cape-lodash'

/* eslint no-bitwise: 0 */

const Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

// Utils to build up our character set.

// Takes two value charChode int arrays and turns them into an array of characters.
export const getChars = flow(Array, map(spread(range)), flatten, map(String.fromCharCode))

// Turns charCodes into lookup tables.
export const createDecodeEncode = flow(
  getChars,
  structuredSelector({
    // Given a number 0-63 return a character. Used when creating a string.
    byCode: identity,
    // Given a char, returns a 6 bit number.
    byChar: charArray => new Map(zip(charArray, range(0, 64))),
    // Simple string of chars for testing mostly.
    chars: join(''),
  }),
  // Function decodeAllChars takes a string and returns an array of 6 bit numbers.
  setWith('decodeAllChars', 'byChar', decode => map(decode.get.bind(decode))),
)

// Regular AIS payload encoding.
export const payloadLookup = createDecodeEncode([48, 88], [96, 120])
// The 6 bit ASCII used with the messages.
export const stringLookup = createDecodeEncode([64, 96], [32, 64])

function placeHoldersCount(b64) {
  const len = b64.length
  // if (len % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')

  // What does NMEA AIS use for equal signs (place holders)?
  // Normally if there are two placeholders, than the two characters before it
  // represent one byte.
  // If there is only one, then the three characters before it represent 2 bytes.
  // This is just a cheap hack to not do indexOf twice.
  if (b64[len - 2] === '=') return 2
  return b64[len - 1] === '=' ? 1 : 0
}

export function byteLength(b64) {
  // base64 is 4/3 + up to two characters of the original data
  return ((b64.length * 3) / 4) - placeHoldersCount(b64)
}

export function toByteArray(b64, decode = payloadLookup.byChar) {
  let i,
    l,
    tmp,
    placeHolders,
    arr
  const len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(((len * 3) / 4) - placeHolders)
  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len
  const get = index => decode.get(b64.charAt(index))

  let L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (get(i) << 18) | (get(i + 1) << 12) | (get(i + 2) << 6) | get(i + 3)
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (get(i) << 2) | (get(i + 1) >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (get(i) << 10) | (get(i + 1) << 4) | (get(i + 2) >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }
  return arr
}

function tripletToBase64(lookup, num) {
  return lookup[(num >> 18) & 0x3F] +
    lookup[(num >> 12) & 0x3F] +
    lookup[(num >> 6) & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk(lookup, uint8, start, end) {
  let output = ''
  // Each span of three bytes includes 4 chars.
  for (let i = start; i < end; i += 3) {
    output += tripletToBase64(lookup,
      ((uint8[i] << 16) & 0xFF0000) + ((uint8[i + 1] << 8) & 0xFF00) + (uint8[i + 2] & 0xFF))
  }
  return output
}

export function fromByteArray(uint8, lookup = payloadLookup.byCode) {
  let tmp
  const len = uint8.length
  const extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  let output = ''
  let parts = ''
  const maxChunkLength = 16383 // must be multiple of 3. 14 ones in binary.
  // go through the array every three bytes, we'll deal with trailing stuff later
  for (let i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts += encodeChunk(
      lookup, uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts += output

  return parts
}
export const aisTxt = uint8 => trimEnd(fromByteArray(uint8, stringLookup.byCode))
