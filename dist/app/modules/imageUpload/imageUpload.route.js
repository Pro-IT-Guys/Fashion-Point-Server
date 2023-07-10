'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.ImageUploadRoute = void 0
const express_1 = __importDefault(require('express'))
const uploader_1 = require('../../middlewares/uploader')
const imageUploadController_1 = require('./imageUploadController')
const router = express_1.default.Router()
router.post(
  '/single-image-upload',
  uploader_1.uploader.uploaderImage.single('image'),
  imageUploadController_1.imageUploadController.fileUpload
)
router.post(
  '/multi-image-upload',
  uploader_1.uploader.uploaderImage.array('image'),
  imageUploadController_1.imageUploadController.multiFileUploads
)
exports.ImageUploadRoute = router
