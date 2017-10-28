export function ensureNumber(num) {
  if (typeof num !== 'number') throw new Error('Invalid input.')
}
export function metersToFeet(meters) {
  ensureNumber(meters)
  return meters * 3.28084
}
export function metersToFathoms(meters) {
  ensureNumber(meters)
  return meters * 0.546807
}
export function nextAction(props) {
  props.next(props.action)
  return props
}
