import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { OrderService } from './order.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import pick from '../../../shared/pick'
import { IPaginationOption } from '../../../interfaces/sharedInterface'
import { paginationFields } from '../../../constant/shared.constant'
import httpStatus from 'http-status'

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderData = req.body
  const data = await OrderService.createOrder(orderData)
  const responseData = {
    data,
    message: 'Order placed successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm'])
  const paginationOption: IPaginationOption = pick(req.query, paginationFields)

  const result = await OrderService.getAllOrder(filters, paginationOption)

  const responseData = {
    statusCode: httpStatus.OK,
    meta: result.meta || {},
    data: result.data || [],
    message: 'All Order fetched successfully',
  }

  sendSuccessResponse(res, responseData)
})

const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.id
  const orderData = req.body
  const data = await OrderService.updateOrder(orderId, orderData)
  const responseData = {
    data,
    message: 'Order updated successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getOrderByUserId = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const data = await OrderService.getOrderByUserId(userId)
  const responseData = {
    data,
    message: 'Order fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getOrderByOrderId = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.id
  const data = await OrderService.getOrderByOrderId(orderId)
  const responseData = {
    data,
    message: 'Order fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const OrderController = {
  createOrder,
  getAllOrder,
  updateOrder,
  getOrderByUserId,
  getOrderByOrderId,
}
