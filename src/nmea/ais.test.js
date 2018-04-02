/* globals describe test expect */
// import { omit } from 'lodash/fp'
import { aisData, convertVdoToVdm, isAis } from './ais'
import { ais1, ais1payload, ais2, ais2payload } from './mock'

describe('isAis', () => {
  const fields = ['1', '1', '', '', 'B5NRnlP00NWr4@Sjm6qHgwiUoP06', '0']
  test('returns true when has matching talker and is isEncapsulated', () => {
    expect(isAis({ talker: 'AI', isEncapsulated: true, fields })).toBe(true)
    expect(isAis({ talker: 'AN', isEncapsulated: true, fields })).toBe(true)
  })
  test('returns false when has non matching talker or is isConventional', () => {
    expect(isAis({ talker: 'AI', isConventional: true, fields })).toBe(false)
    expect(isAis({ talker: 'GP', isEncapsulated: true, fields })).toBe(false)
  })
})
// describe('ais', () => {
//   test('ais1', () => {
//     expect(aisData(ais1)).toEqual({
//       channel: '',
//       class: 'B',
//       courseOverGroundTrue: 141.9,
//       headingTrue: 511,
//       latitude: 26.52349,
//       longitude: -76.976585,
//       mmsi: '367572690',
//       speedOverGround: 0.1,
//       status: -1,
//       type: 18,
//     })
//     expect(aisData(ais2)).toEqual({
//       channel: '',
//       class: 'B',
//       courseOverGroundTrue: 312.2,
//       headingTrue: 511,
//       latitude: 18.333308333333335,
//       longitude: -65.251215,
//       mmsi: '367734850',
//       speedOverGround: 0.2,
//       status: -1,
//       type: 18,
//     })
//   })
// })

// const vdo = '!AIVDO,1,1,,A,B5NRnlP00NWr4@Sjm6qHgwiUoP06,0*0D'

// describe('decode', () => {
//   test('VDO', () => {
//     expect(decode(ais1)).toEqual(ais1payload)
//     expect(decode(ais2)).toEqual(ais2payload)
//   })
// })

// describe('convertVdoToVdm', () => {
//   const vdmRes = convertVdoToVdm(ais1)
//   // test('create valid VDM', () => {
//   //   const vdm = '!AIVDM,1,1,,A,B5NRnlP00FWr4@Sjm6qHgwiUoP06,0*05'
//   //   expect(vdmRes).toBe(vdm)
//   //   expect(decode(vdmRes)).toEqual(ais1payload)
//   // })
//   // test('created VDM', () => {
//   //   expect(decode(vdmRes)).toEqual(vdmRes)
//   // })
// })
