import { spawn } from 'child_process'
import readline from 'readline'
import { analyzerClose, analyzerErr, analyzerData } from './actions'

const defPortPath = '/dev/tty.usbserial-2D80F'
// actisense-serial /dev/tty.usbserial-2D80F | analyzer -json
function getCmd(serialPortPath = defPortPath) {
  return `actisense-serial ${serialPortPath} | analyzer -json`
}

export default function initAnalyzer(dispatcher, serialPortPath) {
  const command = getCmd(serialPortPath)
  const actisAnalyzer = spawn('sh', ['-c', command])

  actisAnalyzer.on('close', dispatcher(analyzerClose))
  actisAnalyzer.stderr.on('data', dispatcher(analyzerErr))

  const linereader = readline.createInterface(actisAnalyzer.stdout, actisAnalyzer.stdin)
  linereader.on('line', dispatcher(analyzerData))
}
