import { attempt, isError, toString } from 'lodash'
import { createSimpleAction } from 'cape-redux'

export const ANALYZER_JSON = 'boatData/AnalyzerJson'
export function analyzerJson(dataLine) {
  const payload = attempt(JSON.parse, dataLine)
  if (isError(payload)) {
    return console.error(payload.stack)
  }
  return { type: ANALYZER_JSON, payload }
}

export const ANALYZER_CLOSE = 'boatData/AnalyzerClose'
export function analyzerClose(payload) {
  console.error(`Analyzer process exited with code ${payload}.`)
  return { type: ANALYZER_CLOSE, payload }
}

export const ANALYZER_ERROR = 'boatData/AnalyzerError'
export const analyzerErr = createSimpleAction(ANALYZER_ERROR, toString)
