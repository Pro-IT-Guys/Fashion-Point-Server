import Stripe from 'stripe'
import config from '../../../config'
import orderModel from '../order/order.model'
import { IOrder } from '../order/order.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2022-11-15',
})

const processPayment = async (
  orderId: string,
  paymentMethodId: string,
  currency: string
): Promise<IOrder> => {
  const order = await orderModel.findById(orderId)

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }

  // Fetch the payment method details from Stripe
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId)

  // Check if the payment method exists and is of type 'card'
  if (!paymentMethod || paymentMethod.type !== 'card') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment method')
  }

  // Create a payment intent using Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: ((order.deliveryFee as number) + order.subTotal) * 100, // Convert the total amount to cents (Stripe expects the amount in the smallest currency unit)
    currency: currency,
    payment_method: paymentMethodId,
    confirm: true,
  })

  // Check if the payment was successful
  if (paymentIntent.status === 'succeeded') {
    order.isPaid = true
    order.paidAt = new Date()

    // Set the payment method string to the order.paymentMethod field
    if (paymentMethod.card) {
      order.paymentMethod = paymentMethod.card.brand as string
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Card information missing')
    }

    const newOrder = await order.save()
    return newOrder
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment failed')
  }
}

export const PaymentService = {
  processPayment,
}
