import { identity, isFunction, round } from 'lodash/fp'
// http://catb.org/gpsd/AIVDM.html
// nmea sentence fields.
const roundTo = round.convert({ fixed: false })

/* eslint-disable no-bitwise */
export const getLon = lon =>
  roundTo(parseFloat(((lon & 0x08000000) ? (lon | 0xf0000000) : lon) / 600000), 4)

export const getLat = lat =>
  roundTo(parseFloat((lat & 0x04000000) ? (lat | 0xf8000000) : lat / 600000), 4)
/* eslint-enable no-bitwise */
export const tenth = num => num / 10

export const valueTypes = {
  lat: getLat,
  lon: getLon,
  tenth,
  u: 'Unsigned integer',
  U: 'Unsigned integer with scale - renders as float, suffix is decimal places',
  i: 'Signed integer',
  I: 'Signed integer with scale - renders as float, suffix is decimal places',
  b: Boolean,
  e: 'Enumerated type (controlled vocabulary)',
  x: 'Spare or reserved bit',
  t: 'String (packed six-bit ASCII)',
  d: 'Data (uninterpreted binary)',
  a: 'Array boundary, numeric suffix is maximum array size. ^ before suffix means preceding fields is the length. Following fields are repeated to end of message',
}

const type = {
  len: 6,
  description: 'Message Type',
  id: 'type',
  type: 'u',
}
const repeat = {
  id: 'repeat',
  len: 2,
  description: 'Repeat Indicator',
  type: 'u',
}
const mmsi = {
  id: 'mmsi',
  len: 30,
  description: 'MMSI',
  name: 'userId',
  type: 'u',
}
const reserved = {
  id: 'reserved',
  len: 8,
  description: 'Regional Reserved',
  type: 'x',
}
const speed = {
  id: 'speed',
  len: 10,
  description: 'Speed Over Ground',
  type: 'tenth',
  signalK: 'speedOverGround',
}
const accuracy = {
  id: 'accuracy',
  len: 1,
  description: 'Position Accuracy',
  name: 'posAccuracy',
  type: 'b',
}
const aisVersion = {
  id: 'aisVersion',
  len: 2,
  description: 'AIS Version',
}
const lon = {
  len: 28,
  description: 'Longitude',
  id: 'lon',
  type: 'lon',
  signalK: 'longitude',
}
const lat = {
  len: 27,
  description: 'Latitude',
  id: 'lat',
  type: 'lat',
  signalK: 'latitude',
}
const course = {
  len: 12,
  description: 'Course Over Ground (COG)',
  id: 'course',
  type: 'tenth',
  signalK: 'courseOverGroundTrue',
}
const destination = {
  id: 'destination',
  len: 120,
  description: 'Destination',
}
const draught = {
  id: 'draught',
  len: 8,
  description: 'Draught',
}
const dte = {
  id: 'dte',
  len: 1,
  description: 'Data Terminal Environment - Is Ready',
  type: 'b',
}
const heading = {
  id: 'heading',
  len: 9,
  description: 'True Heading (HDG)',
  type: 'u',
  signalK: 'headingTrue',
}
const imo = {
  id: 'imo',
  len: 30,
  description: 'IMO Number',
}
const callsign = {
  id: 'callsign',
  len: 42,
  description: 'Call Sign',
}
const shipname = {
  id: 'shipname',
  len: 120,
  description: 'Vessel Name',
}
const year = {
  id: 'year',
  len: 14,
  description: 'Year (UTC)',
  type: 'u',
}
const month = {
  id: 'month',
  len: 4,
  description: 'Month (UTC)',
  type: 'u',
}
const day = {
  id: 'day',
  len: 5,
  description: 'Day (UTC)',
  type: 'u',
}
const hour = {
  id: 'hour',
  len: 5,
  description: 'Hour (UTC)',
}
const minute = {
  id: 'minute',
  len: 6,
  description: 'Minute (UTC)',
}
const second = {
  id: 'second',
  len: 6,
  description: 'UTC Seconds Time Stamp',
  type: 'u',
}
const toBow = {
  id: 'toBow',
  len: 9,
}
const toStern = {
  id: 'toStern',
  len: 9,
}
const toPort = {
  id: 'toPort',
  len: 6,
}
const toStarboard = {
  id: 'toStarboard',
  len: 6,
}
const shiptype = {
  id: 'shiptype',
  len: 8,
  description: 'Ship Type',
}
const regional2 = {
  len: 2,
  description: 'Regional reserved',
  id: 'regional',
  type: 'u',
}
const regional4 = {
  len: 4,
  description: 'Regional reserved',
  id: 'regional',
  type: 'u',
}
const cs = {
  len: 1,
  description: 'CS Unit',
  id: 'cs',
  type: 'b' }
const display = {
  len: 1,
  description: 'Display flag',
  id: 'display',
  type: 'b' }
const dsc = {
  len: 1,
  description: 'Message Type',
  id: 'dsc',
  type: 'b' }
const band = {
  len: 1,
  description: 'Message Type',
  id: 'band',
  type: 'b' }
const msg22 = {
  len: 1,
  description: 'Message Type',
  id: 'msg22',
  type: 'b' }
const assigned = {
  len: 1,
  description: 'Message Type',
  id: 'assigned',
  type: 'b',
}
const epfd = {
  id: 'epfd',
  len: 4,
  description: 'Type of EPFD',
}
const raim = {
  len: 1,
  description: 'RAIM flag',
  id: 'raim',
  type: 'b',
}
const radio = {
  len: 20,
  description: 'Radio status',
  id: 'radio',
  type: 'u',
}
const status = {
  len: 4,
  id: 'status',
}
const turn = {
  len: 8,
  id: 'turn',
}
const maneuver = {
  len: 2,
  description: 'Maneuver Indicator',
  id: 'maneuver',
}
const spare1 = {
  len: 1,
  id: 'spare',
}
const spare3 = {
  len: 3,
  id: 'spare',
}
const spare4 = {
  len: 4,
  id: 'spare',
}
const spare10 = {
  len: 10,
  id: 'spare',
}
function addFields(fields) {
  let start = 0
  return fields.map((value, index) => {
    const res = {
      ...value,
      start,
      position: index,
      processor: isFunction(valueTypes[value.type]) ? valueTypes[value.type] : identity,
    }
    start += value.len
    return res
  })
}
const classA = addFields([
  type, repeat, mmsi,
  status, turn,
  speed, accuracy, lon, lat,
  course, heading, second,
  maneuver, spare3,
  raim, radio,
])
export const msgTypes = new Map([
  {
    id: 1,
    description: 'Position Report Class A',
    fields: classA,
  },
  {
    id: 2,
    description: 'Position Report Class A (Assigned schedule)',
    fields: classA,
  },
  {
    id: 3,
    description: 'Position Report Class A (Response to interrogation)',
    fields: classA,
  },
  {
    id: 4,
    description: 'Base Station Report',
    fields: addFields([
      type, repeat, mmsi,
      year, month, day, hour, minute, second,
      accuracy, lon, lat,
      epfd, spare10,
      raim, radio,
    ]),
  },
  {
    id: 5,
    description: 'Static and Voyage Related Data',
    fields: addFields([
      type, repeat, mmsi,
      aisVersion, imo, callsign,
      shipname, shiptype, toBow, toStern, toPort, toStarboard, epfd,
      month, day, hour, minute,
      draught, destination, dte, spare1,
    ]),
  },
  {
    id: 6,
    description: 'Binary Addressed Message',
    fields: [],
  },
  {
    id: 7,
    description: 'Binary Acknowledge',
    fields: [],
  },
  {
    id: 8,
    description: 'Binary Broadcast Message',
    fields: [],
  },
  {
    id: 9,
    description: 'Standard SAR Aircraft Position Report',
    fields: [],
  },
  {
    id: 10,
    description: 'UTC and Date Inquiry',
    fields: [],
  },
  {
    id: 11,
    description: 'UTC and Date Response',
    fields: [],
  },
  { id: 12, description: 'Addressed Safety Related Message' },
  { id: 13, description: 'Safety Related Acknowledgement' },
  {
    id: 14,
    description: 'Safety Related Broadcast Message',
  },
  { id: 15, description: 'Interrogation' },
  { id: 16, description: 'Assignment Mode Command' },
  { id: 17, description: 'DGNSS Binary Broadcast Message' },
  {
    id: 18,
    description: 'Standard Class B CS Position Report',
    fields: addFields([
      type, repeat, mmsi,
      reserved,
      speed, accuracy, lon, lat,
      course, heading, second,
      regional2, cs, display, dsc, band, msg22, assigned,
      raim, radio,
    ]),
  },
  {
    id: 19,
    description: 'Extended Class B Equipment Position Report',
    fields: addFields([
      type, repeat, mmsi,
      reserved,
      speed, accuracy, lon, lat,
      course, heading, second,
      regional4,
      shipname, shiptype, toBow, toStern, toPort, toStarboard, epfd,
      raim, dte, assigned, spare4,
    ]),
  },
  { id: 20, description: 'Data Link Management' },
  {
    id: 21,
    description: 'Aid-to-Navigation Report',
  },
  { id: 22, description: 'Channel Management' },
  { id: 23, description: 'Group Assignment Command' },
  {
    id: 24,
    description: 'Static Data Report',
    fields: [],
  },
  { id: 25, description: 'Single Slot Binary Message,' },
  { id: 26, description: 'Multiple Slot Binary Message With Communications State' },
  {
    id: 27,
    description: 'Position Report For Long-Range Applications',
  },
].map(value => [value.id, value]))

export const NAV_STATUS = {
  0: 'Under way using engine',
  1: 'At anchor',
  2: 'Not under command',
  3: 'Restricted manoeuverability',
  4: 'Constrained by her draught',
  5: 'Moored',
  6: 'Aground',
  7: 'Engaged in Fishing',
  8: 'Under way sailing',
  9: 'Reserved for future amendment of Navigational Status for HSC',
  10: 'Reserved for future amendment of Navigational Status for WIG',
  11: 'Reserved for future use',
  12: 'Reserved for future use',
  13: 'Reserved for future use',
  14: 'AIS-SART is active',
  15: 'Not defined (default)',
}

export const VESSEL_TYPE = {
  0: 'Not available (default)',
    // 1-19 Reserved for future usage
  20: 'Wing in ground (WIG), all ships of this type',
  21: 'Wing in ground (WIG), Hazardous category A',
  22: 'Wing in ground (WIG), Hazardous category B',
  23: 'Wing in ground (WIG), Hazardous category C',
  24: 'Wing in ground (WIG), Hazardous category D',
  25: 'Wing in ground (WIG), Reserved for future use',
  26: 'Wing in ground (WIG), Reserved for future use',
  27: 'Wing in ground (WIG), Reserved for future use',
  28: 'Wing in ground (WIG), Reserved for future use',
  29: 'Wing in ground (WIG), Reserved for future use',
  30: 'Fishing',
  31: 'Towing',
  32: 'Towing: length exceeds 200m or breadth exceeds 25m',
  33: 'Dredging or underwater ops',
  34: 'Diving ops',
  35: 'Military ops',
  36: 'Sailing',
  37: 'Pleasure Craft',
  38: 'Reserved',
  39: 'Reserved',
  40: 'High speed craft (HSC), all ships of this type',
  41: 'High speed craft (HSC), Hazardous category A',
  42: 'High speed craft (HSC), Hazardous category B',
  43: 'High speed craft (HSC), Hazardous category C',
  44: 'High speed craft (HSC), Hazardous category D',
  45: 'High speed craft (HSC), Reserved for future use',
  46: 'High speed craft (HSC), Reserved for future use',
  47: 'High speed craft (HSC), Reserved for future use',
  48: 'High speed craft (HSC), Reserved for future use',
  49: 'High speed craft (HSC), No additional information',
  50: 'Pilot Vessel',
  51: 'Search and Rescue vessel',
  52: 'Tug',
  53: 'Port Tender',
  54: 'Anti-pollution equipment',
  55: 'Law Enforcement',
  56: 'Spare - Local Vessel',
  57: 'Spare - Local Vessel',
  58: 'Medical Transport',
  59: 'Noncombatant ship according to RR Resolution No. 18',
  60: 'Passenger, all ships of this type',
  61: 'Passenger, Hazardous category A',
  62: 'Passenger, Hazardous category B',
  63: 'Passenger, Hazardous category C',
  64: 'Passenger, Hazardous category D',
  65: 'Passenger, Reserved for future use',
  66: 'Passenger, Reserved for future use',
  67: 'Passenger, Reserved for future use',
  68: 'Passenger, Reserved for future use',
  69: 'Passenger, No additional information',
  70: 'Cargo, all ships of this type',
  71: 'Cargo, Hazardous category A',
  72: 'Cargo, Hazardous category B',
  73: 'Cargo, Hazardous category C',
  74: 'Cargo, Hazardous category D',
  75: 'Cargo, Reserved for future use',
  76: 'Cargo, Reserved for future use',
  77: 'Cargo, Reserved for future use',
  78: 'Cargo, Reserved for future use',
  79: 'Cargo, No additional information',
  80: 'Tanker, all ships of this type',
  81: 'Tanker, Hazardous category A',
  82: 'Tanker, Hazardous category B',
  83: 'Tanker, Hazardous category C',
  84: 'Tanker, Hazardous category D',
  85: 'Tanker, Reserved for future use',
  86: 'Tanker, Reserved for future use',
  87: 'Tanker, Reserved for future use',
  88: 'Tanker, Reserved for future use',
  89: 'Tanker, No additional information',
  90: 'Other Type, all ships of this type',
  91: 'Other Type, Hazardous category A',
  92: 'Other Type, Hazardous category B',
  93: 'Other Type, Hazardous category C',
  94: 'Other Type, Hazardous category D',
  95: 'Other Type, Reserved for future use',
  96: 'Other Type, Reserved for future use',
  97: 'Other Type, Reserved for future use',
  98: 'Other Type, Reserved for future use',
  99: 'Other Type, no additional information',
}

export const aisTalkers = {
  AD: 'MMEA 4.0 Dependent AIS Base Station',
  AI: 'Mobile AIS station',
  AN: 'NMEA 4.0 Aid to Navigation AIS station',
  AR: 'NMEA 4.0 AIS Receiving Station',
  AS: 'NMEA 4.0 Limited Base Station',
  AT: 'NMEA 4.0 AIS Transmitting Station',
  AX: 'NMEA 4.0 Repeater AIS station',
  BS: 'Base AIS station (deprecated in NMEA 4.0)',
  SA: 'NMEA 4.0 Physical Shore AIS Station',
}
export const encodingTable = '0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVW`abcdefghijklmnopqrstuvw'
