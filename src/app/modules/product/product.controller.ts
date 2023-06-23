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

export const ProductController = {
  createProduct,
}
