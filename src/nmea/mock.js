export const ais1base64 = 'B5NRnlP00NWr4@Sjm6qHgwiUoP06'
export const ais1 = `!AIVDO,1,1,,,${ais1base64},0*0D`

export const ais1gpsd = {
  scaled: true,
}
export const ais1decoded = {
  sentence: ais1,
  checksum: '0D',
  fields: ['1', '1', '', '', 'B5NRnlP00NWr4@Sjm6qHgwiUoP06', '0'],
  data: {
    fillBits: 0,
    fragmentCount: 1,
    fragmentNumber: 1,
    messageId: '',
    payload: {
      accuracy: true,
      assigned: false,
      band: true,
      course: 141.9,
      cs: true,
      display: false,
      dsc: true,
      heading: 511,
      lat: 26.5235,
      lon: -76.9766,
      mmsi: 367572690,
      msg22: true,
      radio: 917510,
      raim: true,
      regional: 0,
      repeat: 0,
      reserved: 0,
      second: 35,
      speed: 0.1,
      type: 18,
    },
    radioChannel: '',
  },
  isConventional: false,
  isEncapsulated: true,
  isValid: true,
  talker: 'AI',
  type: 'VDO',
}
export const ais1payload = {
  aistype: 18,
  channel: '',
  class: 'B',
  cog: 141.9,
  hdg: 511,
  immsi: 367572690,
  lat: 26.52349,
  lon: -76.976585,
  mmsi: '367572690', // Free Spirit
  msglen: 28,
  repeat: 0,
  sog: 0.1,
  status: -1,
  utc: 35,
  valid: true,
}
export const ais1six = [
  18, 5, 30, 34, 54, 52, 32, 0, 0, 30, 39, 58, 4, 16,
  35, 50, 53, 6, 57, 24, 47, 63, 49, 37, 55, 32, 0, 6,
]
export const ais1byteArray = new Uint8Array([
  72, 87, 162, 219, 72, 0, 1, 233, 250, 17, 8, 242, 212, 110, 88, 191, 252, 101, 222, 0, 6,
])
export const ais2 = '!AIVDO,1,1,,,B5Ndh@P00fmDnsRWn;73;wsUoP06,0*15'
export const ais3 = '!AIVDO,1,1,,A,B5Ndh@P00NmDnqRWn;33;wb5oP06,0*0B'
export const gll = '$GPGLL,2631.40923,N,07658.59501,W,035239.00,A,D*7E'
export const gpgga = '$GPGGA,035237.00,2631.40930,N,07658.59503,W,2,10,1.00,-3.3,M,-34.4,M,,0000*40'
export const psrt = '$PSRT,TXS,0000,1*47'

export const ais2gpsd = {
  type: 18,
  repeat: 0,
  mmsi: 367734850,
  scaled: true,
  reserved: 0,
  speed: 0.1,
  accuracy: true,
  lon: -65.2512,
  lat: 18.3333,
  course: 312.2,
  heading: 511,
  second: 20,
  regional: 0,
  cs: true,
  display: false,
  dsc: true,
  band: true,
  msg22: true,
  raim: true,
  radio: 917510,
}
export const ais2decoded = {
  checksum: '15',
  fields: ['1', '1', '', '', 'B5Ndh@P00fmDnsRWn;73;wsUoP06', '0'],
  data: {
    fillBits: 0,
    fragmentCount: 1,
    fragmentNumber: 1,
    messageId: '',
    payload: {
      accuracy: true,
      assigned: false,
      band: true,
      course: 312.2,
      cs: true,
      display: false,
      dsc: true,
      heading: 511,
      lat: 18.3333,
      lon: -65.2512,
      mmsi: 367734850,
      msg22: true,
      radio: 917510,
      raim: true,
      regional: 0,
      repeat: 0,
      reserved: 0,
      second: 55,
      speed: 0.2,
      type: 18,
    },
    radioChannel: '',
  },
  isConventional: false,
  isEncapsulated: true,
  isValid: true,
  sentence: ais2,
  talker: 'AI',
  type: 'VDO',
}
export const ais2payload = {
  aistype: 18,
  channel: '',
  class: 'B',
  cog: 312.2,
  hdg: 511,
  immsi: 367734850,
  lat: 18.333308333333335,
  lon: -65.251215,
  mmsi: '367734850', // Sea Yawl
  msglen: 28,
  repeat: 0,
  sog: 0.2,
  status: -1,
  utc: 55,
  valid: true,
}
export const gllDecoded = {
  checksum: '7E',
  fields: ['2631.40923', 'N', '07658.59501', 'W', '035239.00', 'A', 'D'],
  isConventional: true,
  isEncapsulated: false,
  isValid: true,
  sentence: gll,
  talker: 'GP',
  type: 'GLL',
}
