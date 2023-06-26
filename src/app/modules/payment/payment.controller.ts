import { Request, Response } from 'express'
import { PaymentService } from './payment.service'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'

const processPayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId, paymentMethodId, currency } = req.body

  const order = await PaymentService.processPayment(
    orderId,
    paymentMethodId,
    currency
  )

  const responseData = {
    data: order,
    message: 'Payment processed successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const PaymentController = {
  processPayment,
}
