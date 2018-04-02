// http://catb.org/gpsd/AIVDM.html

// nmea sentence fields.
export const fields = ['fragmentCount', 'fragmentNumber', 'messageId', 'radioChannel', 'payload', 'fillBits']

export const MSG_TYPE = {
  1: 'Position Report Class A',
  2: 'Position Report Class A (Assigned schedule)',
  3: 'Position Report Class A (Response to interrogation)',
  4: 'Base Station Report',
  5: 'Static and Voyage Related Data',
  6: 'Binary Addressed Message',
  7: 'Binary Acknowledge',
  8: 'Binary Broadcast Message',
  9: 'Standard SAR Aircraft Position Report',
  10: 'UTC and Date Inquiry',
  11: 'UTC and Date Response',
  12: 'Addressed Safety Related Message',
  13: 'Safety Related Acknowledgement',
  14: 'Safety Related Broadcast Message',
  15: 'Interrogation',
  16: 'Assignment Mode Command',
  17: 'DGNSS Binary Broadcast Message',
  19: 'Extended Class B Equipment Position Report',
  20: 'Data Link Management',
  21: 'Aid-to-Navigation Report',
  22: 'Channel Management',
  23: 'Group Assignment Command',
  24: 'Static Data Report',
  25: 'Single Slot Binary Message,',
  26: 'Multiple Slot Binary Message With Communications State',
  27: 'Position Report For Long-Range Applications',
}
export const valueTypes = {
  u: 'Unsigned integer',
  U: 'Unsigned integer with scale - renders as float, suffix is decimal places',
  i: 'Signed integer',
  I: 'Signed integer with scale - renders as float, suffix is decimal places',
  b: 'Boolean',
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
  len: 2,
  description: 'Repeat Indicator',
  id: 'type',
  type: 'u',
}
const mmsi = {
  len: 30,
  description: 'MMSI',
  name: 'userId',
  id: 'type',
  type: 'u',
}
const reserved = {
  len: 8,
  description: 'Regional Reserved',
  id: 'type',
  type: 'x',
}
const speed = {
  len: 10,
  description: 'Speed Over Ground',
  id: 'spped',
  type: 'U1',
  signalK: 'speedOverGround',
}
const accuracy = {
  len: 1,
  description: 'Position Accuracy',
  name: 'posAccuracy',
  id: 'accuracy',
  type: 'b',
}
const lon = {
  len: 28,
  description: 'Longitude',
  id: 'lon',
  type: 'u',
  signalK: 'longitude',
}
const lat = {
  len: 27,
  description: 'Latitude',
  id: 'lat',
  type: 'u',
  signalK: 'latitude',
}
const course = {
  len: 12,
  description: 'Course Over Ground (COG)',
  id: 'course',
  type: 'u',
  signalK: 'courseOverGroundTrue',
}
const heading = {
  len: 9,
  description: 'True Heading (HDG)',
  id: 'heading',
  type: 'u',
  signalK: 'headingTrue',
}
const second = {
  len: 6,
  description: 'UTC Seconds Time Stamp',
  id: 'second',
  type: 'u',
}
const regional = {
  len: 2,
  description: 'Message Type',
  id: 'regional',
  type: 'u' }
const cs = {
  len: 1,
  description: 'Message Type',
  id: 'cs',
  type: 'b' }
const display = {
  len: 1,
  description: 'Message Type',
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
  type: 'b' }
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
const spare = {
  len: 3,
  id: 'spare',
}

export const msgTypes = new Map([
  [1, {
    id: 1,
    description: 'Position Report Class A',
    fields: [
      type, repeat, mmsi,
      status, turn,
      speed, accuracy, lon, lat,
      course, heading, second,
      maneuver, spare,
      raim, radio,
    ],
  }],
  [18, {
    id: 18,
    description: 'Standard Class B CS Position Report',
    fields: [
      type, repeat, mmsi,
      reserved,
      speed, accuracy, lon, lat,
      course, heading, second,
      regional, cs, display, dsc, band, msg22, assigned,
      raim, radio,
    ],
  }],
])

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
