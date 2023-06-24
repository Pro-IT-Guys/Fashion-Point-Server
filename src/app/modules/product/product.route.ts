import express from 'express'
import { ProductController } from './product.controller'
// import validateRequest from '../../middlewares/validateRequest'
// import { ProductValidation } from './product.velidation'
import uploadMiddleware from '../../middlewares/productFileUpload'

const router = express.Router()

router.post(
  '/',
  // validateRequest(ProductValidation.createProductZodSchema),
  uploadMiddleware,
  ProductController.createProduct
)
router.get('/', ProductController.getAllProduct)
router.patch('/:id', ProductController.updateProduct)

export const ProductRoute = router
