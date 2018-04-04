/* eslint no-bitwise: 0 */
import { flow } from 'lodash/fp'
// Get a slice of bits from a byte.
export function subBits(num, start, length) {
  // Create a mask to remove start and push of the end.
  return (num & (0xff >> start)) >> (8 - (length + start))
}

// Get a slice of up to 32 bits from a Uint8Array.
// @param start: The bit index.
export function get32(arr, start, length) {
  // Find the first byte needed from the array.
  let byteIndex = start / 8 | 0
  // The start position of the first byte.
  const bitIndex = start % 8
  // Size for the first byte.
  const chunkLength = Math.min(8 - bitIndex, length)
  // The first byte will have this much 0 padding.
  let shiftLeft = length - chunkLength
  // Get what we can get from the first byte.
  let result = subBits(arr[byteIndex], bitIndex, chunkLength) << shiftLeft
  // Subtract chunk length.
  let remain = length - chunkLength
  // while loop was easiest for me to think about. For as long as we need more bits...
  while (remain) {
    // The lesser of a full byte or whatever bit count is remaining.
    const endPos = Math.min(remain, 8)
    // Subtract bit size of chunk from remaining bits.
    remain -= endPos
    // Subtract bit size of chunk from the shiftLeft.
    shiftLeft -= endPos
    // Advance Uint8Array index position.
    byteIndex += 1
    // Add this chunk to our result using bitwise OR. Move to correct position with shiftLeft.
    result |= (subBits(arr[byteIndex], 0, endPos) << shiftLeft)
  }
  return result
}
export const getUint32 = get32

// @param start: The bit index.
export function getBits(arr, start, length) {
  let remain = length
  const byteFraction = length / 8
  // Following two lines replace Math.ceil(n). It's twice as fast.
  let bytes = (byteFraction << 0)
  bytes = bytes === byteFraction ? bytes : bytes + 1
  const result = new DataView(new ArrayBuffer(bytes))
  let byteOffset = 0
  let bitIndex = start
  // For as long as we need more bits...
  while (remain) {
    // The lesser of a full byte or whatever bit count is remaining.
    const endPos = Math.min(remain, 32)
    const num = get32(arr, bitIndex, endPos)
    if (endPos > 24) {
      result.setUint32(byteOffset, num)
      byteOffset += 4
    } else if (endPos > 16) {
      result.setUint16(byteOffset, num >> 8)
      byteOffset += 2
      result.setUint8(byteOffset, num & 0xff)
      // byteOffset += 1
    } else if (endPos > 8) {
      result.setUint16(byteOffset, num)
      // byteOffset += 2
    } else {
      result.setUint8(byteOffset, num)
      // byteOffset += 1
    }
    bitIndex += endPos
    // Subtract bit size of chunk from remaining bits.
    remain -= endPos
  }
  return result
}
export const getDataView = getBits
export const toUint8Array = res => new Uint8Array(res.buffer)
export const getBytes = flow(getDataView, toUint8Array)
