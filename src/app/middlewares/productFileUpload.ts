/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// This is for without converting to WebP

/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-unused-vars */
// import { Request, Response, NextFunction } from 'express'
// import multer from 'multer'

// const storage = multer.diskStorage({
//   destination: 'dist/public/images/product',
//   filename: (
//     req: Request,
//     file: any,
//     cb: (error: Error | null, filename: string) => void
//   ) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//     const extension = file.originalname.split('.').pop()
//     cb(null, `${uniqueSuffix}.${extension}`)
//   },
// })

// const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   const upload = multer({ storage }).fields([
//     { name: 'frontImage', maxCount: 1 },
//     { name: 'backImage', maxCount: 1 },
//     { name: 'restImage', maxCount: 10 },
//   ])

//   upload(req, res, error => {
//     if (error) {
//       next(error)
//     }
//     next()
//   })
// }

// export default uploadMiddleware

// This is for converting to WebP

import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

function deleteFileWithRetry(
  filePath: string,
  maxRetries: number,
  delay: number
) {
  let retries = 0

  function attemptDeletion() {
    fs.unlink(filePath, error => {
      if (error) {
        if (error.code === 'EBUSY' && retries < maxRetries) {
          console.log(
            `File is busy or locked. Retrying deletion in ${delay}ms...`
          )
          retries++
          setTimeout(attemptDeletion, delay)
        } else {
          console.error(`Failed to delete file: ${error.message}`)
        }
      } else {
        console.log(`File deleted successfully: ${filePath}`)
      }
    })
  }

  attemptDeletion()
}

const storage = multer.diskStorage({
  destination: 'dist/public/images/product/',
  filename: (
    req: Request,
    file: any,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const date = String(currentDate.getDate()).padStart(2, '0')
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0')

    const uniqueSuffix = `${year}${month}${date}${milliseconds}`
    const extension = file.originalname.split('.').pop()
    cb(
      null,
      `${uniqueSuffix}-${file.originalname.split('.')[0].trim()}.${extension}`
    )
  },
})

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const maxSize = 4 * 1024 * 1024 // 4MB

  const upload = multer({
    storage,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    { name: 'frontImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 },
    { name: 'restImage', maxCount: 10 },
  ])

  upload(req, res, async error => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        error.message = 'File size exceeds the allowed limit of 2MB.'
      }
    }

    if (error) {
      next(error)
      return
    }

    const uploadedFiles = req.files as any

    // Convert frontImage to WebP
    if (uploadedFiles?.frontImage) {
      const frontImage = uploadedFiles.frontImage[0]
      const frontImagePath = frontImage.path
      const frontImageWebPPath = path.join(
        path.dirname(frontImagePath),
        `${path.basename(frontImagePath, path.extname(frontImagePath))}.webp`
      )
      await sharp(frontImagePath).toFormat('webp').toFile(frontImageWebPPath)

      // Remove original frontImage
      setTimeout(() => {
        deleteFileWithRetry(frontImagePath, 3, 3000)
      }, 5000)
    }

    // Convert backImage to WebP
    if (uploadedFiles?.backImage) {
      const backImage = uploadedFiles.backImage[0]
      const backImagePath = backImage.path
      const backImageWebPPath = path.join(
        path.dirname(backImagePath),
        `${path.basename(backImagePath, path.extname(backImagePath))}.webp`
      )
      await sharp(backImagePath).toFormat('webp').toFile(backImageWebPPath)

      // Remove original backImage
      setTimeout(() => {
        deleteFileWithRetry(backImagePath, 3, 3000)
      }, 5000)
    }

    // Convert restImage files to WebP
    if (uploadedFiles?.restImage) {
      const restImages = uploadedFiles.restImage
      await Promise.all(
        restImages.map(async (image: any) => {
          const restImagePath = image.path
          const restImageWebPPath = path.join(
            path.dirname(restImagePath),
            `${path.basename(restImagePath, path.extname(restImagePath))}.webp`
          )
          await sharp(restImagePath).toFormat('webp').toFile(restImageWebPPath)

          // Remove original restImage
          setTimeout(() => {
            deleteFileWithRetry(restImagePath, 3, 3000)
          }, 5000)
        })
      )
    }
    next()
  })
}

export default uploadMiddleware
