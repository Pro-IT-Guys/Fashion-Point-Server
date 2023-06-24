/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
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

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const upload = multer({ storage }).fields([
    { name: 'frontImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 },
    { name: 'restImage', maxCount: 10 },
  ])

  upload(req, res, error => {
    if (error) {
      next(error)
    }
    next()
  })
}

export default uploadMiddleware
