export const mHex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

export function toHexString(v) {
  const msn = (v >> 4) & 0x0f
  const lsn = (v >> 0) & 0x0f
  return mHex[msn] + mHex[lsn]
}

function computeChecksum(sentence) {
  let c1
  let i
  // skip the $
  i = 1
  // init to first character    var count;
  c1 = sentence.charCodeAt(i)

  // process rest of characters, zero delimited
  for (i = 2; i < sentence.length; ++i) {
    c1 = c1 ^ sentence.charCodeAt(i)
  }

  return '*' + toHexString(c1)
}
export function toSentence(parts) {
  const base = parts.join(',')
  return base + computeChecksum(base)
}
