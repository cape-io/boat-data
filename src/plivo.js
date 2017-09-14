import { RestAPI } from 'plivo'

const authId = 'MANJHMNMRMNMFMYWVMZT'
const authToken = 'YmQyZDc5MDEzNGUxOGIyOGEwNjk1ZTRiYzg5Njgx'
const client = RestAPI({ authId, authToken })

const plivoPhoneNumber = '16513622062'
const destinationNumbers = '16128459876<16128604060<16179596539'
const messageTrue = 'DRAG ALARM! FREE SPIRIT is outside the alarm radius.'
const messageFalse = 'FREE SPIRIT is back inside the radius.'

function getParams(active) {
  const message = active ? messageTrue : messageFalse
  return {
    src: plivoPhoneNumber, // Sender's phone number with country code
    dst: destinationNumbers, // Receiver's phone Number with country code
    text: message, // Your SMS Text Message - English
    url: 'https://us-central1-sailboatdata-e0e5b.cloudfunctions.net/smsResponse', // The URL to which with the status of the message is sent
  }
}
export default function sendAlarm(active) {
  client.send_message(getParams(active), (status, response) => {
    console.log('Status: ', status)
    console.log('API Response:\n', response)
    console.log('Message UUID:\n', response.message_uuid)
    console.log('Api ID:\n', response.api_id)
  })
}
