import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { DeliveryFeeService } from './deliveryFee.service'
import { sendSuccessResponse } from '../../../shared/customResponse'

const createFee = catchAsync(async (req: Request, res: Response) => {
  const data = await DeliveryFeeService.CreateFee()
  const responseData = {
    data,
    message: 'Delivery fee created successfully',
  }

  sendSuccessResponse(res, responseData)
})

const updateFee = catchAsync(async (req: Request, res: Response) => {
  const deliveryData = req.body
  const { id } = req.params

  const data = await DeliveryFeeService.updateFee(id, deliveryData)
  const responseData = {
    data,
    message: 'Delivery fee updated successfully',
  }

  sendSuccessResponse(res, responseData)
})

export const DeliveryFeeController = {
  createFee,
  updateFee,
}
