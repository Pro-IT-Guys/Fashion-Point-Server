import express from 'express'
import { ProductController } from './product.controller'
import validateRequest from '../../middlewares/validateRequest'
import { ProductValidation } from './product.velidation'

const router = express.Router()

router.post(
  '/',
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct
)
router.get('/', ProductController.getAllProduct)
router.patch('/:id', ProductController.updateProduct)

export const ProductRoute = router
