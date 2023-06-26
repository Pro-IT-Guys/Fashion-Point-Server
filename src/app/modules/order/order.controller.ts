import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { OrderService } from './order.service'
import { sendSuccessResponse } from '../../../shared/customResponse'

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body
  const data = await OrderService.createOrder(orderData)
  const responseData = {
    data,
    message: 'Order placed successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const OrderController = {
  createOrder,
}
