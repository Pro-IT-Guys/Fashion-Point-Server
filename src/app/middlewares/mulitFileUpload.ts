/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import multer from 'multer'
import { Request } from 'express'

const multiProductImageStorage = multer.diskStorage({
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

export const multiProductImageUploadMiddleware = multer({
  storage: multiProductImageStorage,
}).array('restImage', 10)
