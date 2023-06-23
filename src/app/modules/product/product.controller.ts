import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ProductService } from './product.service'
import { sendSuccessResponse } from '../../../shared/customResponse'

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body

  const product = await ProductService.createProduct(productData)
  const responseData = {
    message: 'Product created successfully',
    data: product,
  }

  sendSuccessResponse(res, responseData)
})

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id
  const productData = req.body

  const product = await ProductService.updateProduct(productId, productData)
  const responseData = {
    message: 'Product updated successfully',
    data: product,
  }

  sendSuccessResponse(res, responseData)
})

export const ProductController = {
  createProduct,
  updateProduct,
}
