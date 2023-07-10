'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.convertMultipleValuesToObject = void 0
const convertMultipleValuesToObject = data => {
  const convertedData = Object.assign({}, data)
  for (const key in convertedData) {
    if (Object.prototype.hasOwnProperty.call(convertedData, key)) {
      const value = convertedData[key]
      if (Array.isArray(value)) {
        // Skip if the value is already an array
        continue
      }
      if (typeof value === 'string' && value.includes(',')) {
        convertedData[key] = value.split(',')
      }
    }
  }
  return convertedData
}
exports.convertMultipleValuesToObject = convertMultipleValuesToObject
