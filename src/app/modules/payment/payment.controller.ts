import { Request, Response } from 'express'
import { PaymentService } from './payment.service'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { OrderWithRedirect } from './payment.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const stripePayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId, paymentMethodId, currency } = req.body

  const order = await PaymentService.stripePayment(
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

const paypalPayment = catchAsync(async (req: Request, res: Response) => {
  const { orderId, email, currency } = req.body

  const approvalUrl: OrderWithRedirect = await PaymentService.paypalPayment(
    orderId,
    email,
    currency
  )

  if (approvalUrl.redirectUrl) {
    const responseData = {
      data: approvalUrl,
      message: 'Payment processed successfully',
    }
    sendSuccessResponse(res, responseData)
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create PayPal payment'
    )
  }
})

const handlePayPalWebhookForVerifyPayment = catchAsync(
  async (req: Request, res: Response) => {
    // Get the payment ID from the webhook event
    const paymentId = req.body.resource.id

    const payment = await PaymentService.handlePayPalWebhookForVerifyPayment(
      paymentId
    )

    const responseData = {
      data: payment,
      message: 'Payment processed successfully',
    }
    sendSuccessResponse(res, responseData)
  }
)

export const PaymentController = {
  stripePayment,
  paypalPayment,
  handlePayPalWebhookForVerifyPayment,
}
