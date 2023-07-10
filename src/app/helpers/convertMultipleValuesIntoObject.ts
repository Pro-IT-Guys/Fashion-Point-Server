import { ParsedQs } from 'qs'

export const convertMultipleValuesToObject = (
  data: Record<string, string | string[]>
): Record<string, string | string[]> => {
  const convertedData: Record<string, string | string[]> = { ...data }

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
