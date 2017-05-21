import { attempt, isError, toString } from 'lodash'
import { createSimpleAction } from 'cape-redux'

export const ANALYZER_ERROR = 'boatData/AnalyzerError'
export const analyzerErr = createSimpleAction(ANALYZER_ERROR, toString)

export const ANALYZER_DATA = 'boatData/AnalyzerData'
export function analyzerData(dataLine) {
  const payload = attempt(JSON.parse, dataLine)
  if (isError(payload)) {
    console.error(payload.stack)
    return analyzerErr(payload)
  }
  // console.log(payload)
  return { type: ANALYZER_DATA, payload }
}

export const ANALYZER_CLOSE = 'boatData/AnalyzerClose'
export function analyzerClose(payload) {
  console.error(`Analyzer process exited with code ${payload}.`)
  return { type: ANALYZER_CLOSE, payload }
}
