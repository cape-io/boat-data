import { flow } from 'lodash/fp'
import { sendUdp } from './broadcast'
import { nextAction } from './utils'


// Sending off all AIS data.
export function handleSerialData({ action, store }) {
  if (action.payload) {
    sendUdp(store.getState().config, action.payload)
  } else {
    console.error(action)
  }
}

export default flow(
  nextAction,
  handleSerialData,
)
