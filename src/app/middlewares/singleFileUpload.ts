/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: 'dist/public/images/product',
  filename: (
    req: Request,
    file: any,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.originalname.split('.').pop()
    cb(null, `${uniqueSuffix}.${extension}`)
  },
})

export const productFrontPictureUploadMiddleware = multer({ storage }).single(
  'frontImage'
)
export const productBackPictureUploadMiddleware = multer({ storage }).single(
  'backImage'
)

export const profilePictureUploadMiddleware = multer({ storage }).single(
  'profilePicture'
)
