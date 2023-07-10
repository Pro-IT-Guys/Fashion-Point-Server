'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const convertToWebP = filename => {
  var _a
  if (!filename) {
    throw new Error('Invalid filename')
  }
  const extension =
    (_a = filename.split('.').pop()) === null || _a === void 0
      ? void 0
      : _a.toLowerCase()
  if (!extension) {
    throw new Error('Invalid file extension')
  }
  const filenameWithoutExtension = filename.replace(`.${extension}`, '')
  return `${filenameWithoutExtension}.webp`
}
exports.default = convertToWebP
