export function isNumber(value) {
  return !isNaN(value) && parseFloat(value) > 0;
}
