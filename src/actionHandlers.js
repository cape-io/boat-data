import sendMsg from './broadcast'

export function sendAis(sentence) {
  sendMsg(sentence, '5.9.207.224', 6636)
  sendMsg(sentence, '54.204.25.151', 7113)
  sendMsg(sentence, '144.76.105.244', 2092)
}
