const BitView = function (buf) {
  this.buffer = buf
  this.u8 = new Uint8Array(buf)
}

BitView.prototype.getBit = function (idx) {
  const v = this.u8[idx >> 3]
  const off = idx & 0x7
  return (v >> (7 - off)) & 1
}

BitView.prototype.setBit = function (idx, val) {
  const off = idx & 0x7
  if (val) {
    this.u8[idx >> 3] |= (0x80 >> off)
  } else {
    this.u8[idx >> 3] &= ~(0x80 >> off)
  }
}

BitView.prototype.getInt12 = function (idx) {
  const bidx = idx / 8 | 0
  let a = this.u8[bidx]
  let b = this.u8[bidx + 1]
  let c = this.u8[bidx + 2]
  const off = idx % 8
  const abits = 8 - off
  const bbits = Math.min(12 - abits, 8)
  const cbits = Math.max(12 - abits - bbits, 0)
  const am = ~(0xff << (abits))
  const bm = (0xff << (8 - bbits))
  const cm = (0xff << (8 - cbits))
  a &= am
  b &= bm
  c &= cm
  return (((a << 16) + (b << 8) + c) >> (12 - off)) - 2048
}

BitView.prototype.setInt12 = function (idx, val) {
  val += 2048
  const bidx = idx / 8 | 0
  const off = idx % 8
  const v = val << (12 - off)
  const a = (v & 0xff0000) >> 16
  const b = (v & 0x00ff00) >> 8
  const c = v & 0x0000ff
  const abits = 8 - off
  const bbits = Math.min(12 - abits, 8)
  const cbits = Math.max(12 - abits - bbits, 0)
  const am = (0xff << (abits))
  this.u8[bidx] = (this.u8[bidx] & am) + a
  const bm = ~(0xff << (8 - bbits))
  this.u8[bidx + 1] = (this.u8[bidx + 1] & bm) + b
  const cm = ~(0xff << (8 - cbits))
  this.u8[bidx + 2] = (this.u8[bidx + 2] & cm) + c
}

BitView.prototype.getInt6 = function (idx) {
  const bidx = idx / 8 | 0
  let a = this.u8[bidx]
  let b = this.u8[bidx + 1]
  const off = idx % 8
  const abits = 8 - off
  const bbits = Math.max(6 - abits, 0)
  const am = ~((0xff << (abits)) + (0xff >> (8 - (2 - off))))
  const bm = (0xff << (8 - bbits))
  a &= am
  b &= bm
  return (((a << 8) + b) >> (10 - off)) - 32
}

BitView.prototype.setInt6 = function (idx, val) {
  val += 32
  const bidx = idx / 8 | 0
  const off = idx % 8
  const v = val << (10 - off)
  const a = (v & 0xff00) >> 8
  const b = (v & 0x00ff)
  const abits = 8 - off
  const bbits = Math.max(6 - abits, 0)
  const am = ((0xff << (abits)) + (0xff >> (8 - (2 - off))))
  this.u8[bidx] = (this.u8[bidx] & am) + a
  const bm = ~(0xff << (8 - bbits))
  this.u8[bidx + 1] = (this.u8[bidx + 1] & bm) + b
}

BitView.test = function () {
  const buf = new ArrayBuffer(3)
  const bv = new BitView(buf)
  let i,
    j
  for (j = 0; j < 12; j++) {
    for (i = -2048; i < 2048; i++) {
      bv.setInt12(j, i)
      if (bv.getInt12(j) != i) {
        console.log('12-bit prob at', j, i)
        console.log('expected', i, 'got', bv.getInt12(j))
        break
      }
    }
  }
  for (j = 0; j < 18; j++) {
    for (i = -32; i < 32; i++) {
      bv.setInt6(j, i)
      if (bv.getInt6(j) != i) {
        console.log('6-bit prob at', j, i)
        console.log('expected', i, 'got', bv.getInt6(j))
        break
      }
    }
  }
  return bv
}

const bv = new BitView(new ArrayBuffer(3))
bv.setInt6(0, 4 >>> 0)
console.log(
  bv.getBit(0),
  bv.getBit(1),
  bv.getBit(2),
  bv.getBit(3),
  bv.getBit(4),
  bv.getBit(5),
  bv.getBit(6),
  bv.getBit(7),
  bv.getBit(8),
  bv.getBit(9),
  bv.getBit(10),
  bv.getBit(11),
  // +bv.getBoolean(8),
)
