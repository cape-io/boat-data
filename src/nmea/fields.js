import { identity } from 'lodash/fp'
import { decodePayload } from './ais'

export const getInt = num => parseInt(num, 10)
export const processType = {
  ais: decodePayload,
  bool: Boolean,
  const: identity,
  float: parseFloat,
  int: getInt,
  undefined: identity,
}
const VDM = {
  name: 'VDM',
  description: 'Reports from other ships',
  fields: [
    { id: 'fragmentCount', type: 'int' },
    { id: 'fragmentNumber', type: 'int' },
    { id: 'messageId' },
    { id: 'radioChannel' },
    { id: 'payload', type: 'ais' },
    { id: 'fillBits', type: 'int' },
  ],
}

export const fieldInfo = {
  DBT: {
    name: 'depth',
    description: 'Depth below transducer',
    signalK: 'environment.depth.belowTransducer',
    fields: [
      { id: 'feet', type: 'float' },
      { id: 'unitFeet', type: 'const', value: 'f' },
      { id: 'meters', type: 'float' },
      { id: 'unitMeters', type: 'const', value: 'M' },
      { id: 'fathoms', type: 'float' },
      { id: 'unitFathoms', type: 'const', value: 'F' },
    ],
  },
  VDO: {
    id: 'VDO',
    description: 'Own Ship AIS',
    fields: VDM.fields,
  },
  VDM,
}
