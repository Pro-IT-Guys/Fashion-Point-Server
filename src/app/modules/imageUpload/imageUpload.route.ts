import express from 'express'
import { uploader } from '../../middlewares/uploader'
import { imageUploadController } from './imageUploadController'
const router = express.Router()

router.post(
  '/single-image-upload',
  uploader.uploaderImage.single('image'),
  imageUploadController.fileUpload
)
router.post(
  '/multi-image-upload',
  uploader.uploaderImage.array('image'),
  imageUploadController.multiFileUploads
)

export const ImageUploadRoute = router
