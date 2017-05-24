import { spawn } from 'child_process'
import readline from 'readline'
import { analyzerClose, analyzerErr, analyzerData } from './actions'

export default function initProcess(dispatcher) {
  const command = 'gpsdecode'
  const process = spawn(command)

  process.on('close', dispatcher(analyzerClose))
  process.stderr.on('data', dispatcher(analyzerErr))

  const linereader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  linereader.on('line', dispatcher(analyzerData))
  return linereader.write
}
