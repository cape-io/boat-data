import { RestAPI } from 'plivo'

const authId = ''
const authToken = ''
const client = RestAPI({ authId, authToken })

const plivoPhoneNumber = '16513622062'

function getParams({ dst, text }) {
  return {
    src: plivoPhoneNumber, // Sender's phone number with country code
    dst, // Receiver's phone Number with country code
    text, // Your SMS Text Message - English
    // The URL to which with the status of the message is sent.
    url: 'https://us-central1-sailboatdata-e0e5b.cloudfunctions.net/smsResponse',
  }
}
export default function sendMsg(params) {
  console.log('sendMsg')
  client.send_message(getParams(params), (status, response) => {
    console.log('Status: ', status)
    console.log('API Response:\n', response)
    console.log('Message UUID:\n', response.message_uuid)
    console.log('Api ID:\n', response.api_id)
  })
}
