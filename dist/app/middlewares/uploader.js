'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.uploader = void 0
const multer_1 = __importDefault(require('multer'))
const path_1 = __importDefault(require('path'))
const storage = multer_1.default.diskStorage({
  destination: 'dist/public/images/product/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '_' + file.originalname)
  },
})
const uploaderImage = (0, multer_1.default)({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // const supportedImage = /png|jpg/;
    const supportedImage = /jpeg|jpg|webp|png/
    const extension = path_1.default.extname(file.originalname)
    if (supportedImage.test(extension)) {
      cb(null, true)
    } else {
      cb(new Error('Unsupported image format'))
    }
  },
  limits: {
    fileSize: 50000000,
  },
})
exports.uploader = {
  uploaderImage,
}
