'use strict'
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// This is for without converting to WebP
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const multer_1 = __importDefault(require('multer'))
const sharp_1 = __importDefault(require('sharp'))
const path_1 = __importDefault(require('path'))
const fs_1 = __importDefault(require('fs'))
function deleteFileWithRetry(filePath, maxRetries, delay) {
  let retries = 0
  function attemptDeletion() {
    fs_1.default.unlink(filePath, error => {
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
const storage = multer_1.default.diskStorage({
  destination: 'dist/public/images/product/',
  filename: (req, file, cb) => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const date = String(currentDate.getDate()).padStart(2, '0')
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0')
    const uniqueSuffix = `${year}${month}${date}${milliseconds}`
    const extension = file.originalname.split('.').pop()
    // Check if the file extension is valid
    if (
      extension !== 'webp' &&
      extension !== 'jpg' &&
      extension !== 'jpeg' &&
      extension !== 'png'
    ) {
      const error = new Error(
        'Invalid file format. Only images webp, jpg, jpeg, png are allowed.'
      )
      cb(error, '')
    } else if (extension === 'webp') {
      cb(null, `${uniqueSuffix}-${file.originalname.replace(/\s/g, '-')}`)
    } else {
      cb(
        null,
        `${uniqueSuffix}-${file.originalname
          .split('.')[0]
          .replace(/\s/g, '')}.${extension}`
      )
    }
  },
})
const uploadMiddleware = (req, res, next) => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const upload = (0, multer_1.default)({
    storage,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    { name: 'frontImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 },
    // { name: 'restImage', maxCount: 10 },
  ])
  upload(req, res, error =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (error instanceof multer_1.default.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          error.message = 'File size exceeds the allowed limit of 10MB.'
        }
      }
      if (error) {
        next(error)
        return
      }
      const uploadedFiles = req.files
      // Convert frontImage to WebP
      if (
        uploadedFiles === null || uploadedFiles === void 0
          ? void 0
          : uploadedFiles.frontImage
      ) {
        const frontImage = uploadedFiles.frontImage[0]
        const frontImagePath = frontImage.path
        const frontImageExtension = path_1.default
          .extname(frontImagePath)
          .toLowerCase()
        const frontImageWebPPath = path_1.default.join(
          path_1.default.dirname(frontImagePath),
          `${path_1.default.basename(frontImagePath, frontImageExtension)}.webp`
        )
        // Check if the frontImage is already in WebP format
        if (frontImageExtension === '.webp') {
          // Skip conversion, use the original WebP image
          fs_1.default.rename(frontImagePath, frontImageWebPPath, error => {
            if (error) {
              console.error('Failed to rename the file:', error)
            }
          })
        } else {
          // Convert frontImage to WebP
          yield (0, sharp_1.default)(frontImagePath)
            .toFormat('webp')
            .toFile(frontImageWebPPath)
          // Remove original frontImage
          setTimeout(() => {
            deleteFileWithRetry(frontImagePath, 3, 3000)
          }, 5000)
        }
      }
      // Convert backImage to WebP
      if (
        uploadedFiles === null || uploadedFiles === void 0
          ? void 0
          : uploadedFiles.backImage
      ) {
        const backImage = uploadedFiles.backImage[0]
        const backImagePath = backImage.path
        const backImageExtension = path_1.default
          .extname(backImagePath)
          .toLowerCase()
        const backImageWebPPath = path_1.default.join(
          path_1.default.dirname(backImagePath),
          `${path_1.default.basename(backImagePath, backImageExtension)}.webp`
        )
        // Check if the backImage is already in WebP format
        if (backImageExtension === '.webp') {
          // Skip conversion, use the original WebP image
          fs_1.default.rename(backImagePath, backImageWebPPath, error => {
            if (error) {
              console.error('Failed to rename the file:', error)
            }
          })
        } else {
          // Convert backImage to WebP
          yield (0, sharp_1.default)(backImagePath)
            .toFormat('webp')
            .toFile(backImageWebPPath)
          // Remove original backImage
          setTimeout(() => {
            deleteFileWithRetry(backImagePath, 3, 3000)
          }, 5000)
        }
      }
      // Convert restImage files to WebP
      // if (uploadedFiles?.restImage) {
      //   const restImages = uploadedFiles.restImage
      //   await Promise.all(
      //     restImages.map(async (image: Express.Multer.File) => {
      //       const restImagePath = image.path
      //       const restImageExtension = path.extname(restImagePath).toLowerCase()
      //       const restImageWebPPath = path.join(
      //         path.dirname(restImagePath),
      //         `${path.basename(restImagePath, restImageExtension)}.webp`
      //       )
      //       // Check if the restImage is already in WebP format
      //       if (restImageExtension === '.webp') {
      //         // Skip conversion, use the original WebP image
      //         fs.rename(restImagePath, restImageWebPPath, error => {
      //           if (error) {
      //             console.error('Failed to rename the file:', error)
      //           }
      //         })
      //       } else {
      //         // Convert restImage to WebP
      //         await sharp(restImagePath)
      //           .toFormat('webp')
      //           .toFile(restImageWebPPath)
      //         // Remove original restImage
      //         setTimeout(() => {
      //           deleteFileWithRetry(restImagePath, 3, 3000)
      //         }, 5000)
      //       }
      //     })
      //   )
      // }
      next()
    })
  )
}
exports.default = uploadMiddleware
