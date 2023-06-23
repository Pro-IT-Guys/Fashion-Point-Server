import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { BrandService } from './brand.service'
import { sendSuccessResponse } from '../../../shared/customResponse'

const createBrand = catchAsync(async (req: Request, res: Response) => {
  const brand = await BrandService.createBrand(req.body)

  const responseData = {
    message: 'Brand created successfully',
    data: brand,
  }
  sendSuccessResponse(res, responseData)
})

export const BrandController = {
  createBrand,
}
