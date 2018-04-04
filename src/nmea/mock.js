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
    messageId: null,
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
  35, 50, 53, 6, 57, 24, 47, 63, 49, 37, 55, 32, 0, 6]
export const ais1byteArray = new Uint8Array([
  72, 87, 162, 219, 72, 0, 1, 233, 250, 17, 8, 242, 212, 110, 88, 191, 252, 101, 222, 0, 6])
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
    messageId: null,
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

export const msg5base64 = '55`V:jT2EhBU``kWOK48h4<f0LthB2222222220U2HC44vg>N50@P@kp888888888888880'
export const msg5byteArray = new Uint8Array([
  20, 90, 38, 43, 41, 2, 87, 4, 165, 162, 140, 231, 125, 177, 8, 192, 67, 46, 1, 207,
  48, 72, 32, 130, 8, 32, 130, 8, 32, 37, 9, 132, 196, 19, 235, 206, 120, 80, 16, 129,
  12, 248, 32, 130, 8, 32, 130, 8, 32, 130, 8, 32, 128])
// !AIVDM,2,1,9,B,55`V:jT2EhBU``kWOK48h4<f0LthB2222222220U2HC44vg>N50@P@kp8888,0*74
// !AIVDM,2,2,9,B,88888888880,2*2E
// !AIVDM,2,1,0,B,55NWjhP00001L@SOWSPhtpN05LDTLQ@DB222220U2P=336eA0540C3H0Q@@j,0*20
// !AIVDM,2,2,0,B,88888888880,2*27
// !AIVDM,2,1,1,B,55NCAc000001L@CWSKT4pD`v222222222222220U0h=335I?N4S@DTj820DP,0*05
// !AIVDM,2,2,1,B,SmD`8888880,2*3C
// !AIVDM,2,1,2,B,5819?@@2ASSmKMTs801HUH60l5<000000000000U30?445>DA5S@DTj20DPS,0*60
// !AIVDM,2,2,2,B,lP000000000,2*19
// !AIVDM,2,1,3,A,54al?N82>DSiK<p;B205@h4q@T>1=Dr22222221@;0;78uJ?N90@P@kp8888,0*65
// !AIVDM,2,2,3,A,88888888880,2*27
