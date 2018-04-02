/* eslint no-bitwise: 0 */

// function getBits(num, start, length) {
//   const mask = 0xff >> start
//   const shiftRight = 8 - (length + start)
//   return (num & mask) >> shiftRight
// }

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
