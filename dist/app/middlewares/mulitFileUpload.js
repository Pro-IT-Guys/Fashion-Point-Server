'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.multiProductImageUploadMiddleware = void 0
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
const multer_1 = __importDefault(require('multer'))
const multiProductImageStorage = multer_1.default.diskStorage({
  destination: 'dist/public/images/product',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.originalname.split('.').pop()
    cb(null, `${uniqueSuffix}.${extension}`)
  },
})
exports.multiProductImageUploadMiddleware = (0, multer_1.default)({
  storage: multiProductImageStorage,
}).array('restImage', 10)
