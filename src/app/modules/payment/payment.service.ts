/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe'
import paypal, { Payment } from 'paypal-rest-sdk'
import config from '../../../config'
import orderModel from '../order/order.model'
import { IOrder } from '../order/order.interface'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { CustomPayment, OrderWithRedirect } from './payment.interface'

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2022-11-15',
})

const stripePayment = async (
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
      order.paymentId = paymentIntent.id as string
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Card information missing')
    }

    const newOrder = await order.save()
    return newOrder
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment failed')
  }
}

paypal.configure({
  mode: config.paypal_mode as string, // Set the mode ('sandbox' or 'live') based on your environment
  client_id: config.paypal_client_id as string,
  client_secret: config.paypal_secret_key as string,
})

const paypalPayment = async (
  orderId: string,
  email: string,
  currency: string
): Promise<OrderWithRedirect> => {
  const order = await orderModel.findById(orderId)

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  }

  // Create a PayPal payment object
  const paymentData = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
      payer_info: {
        email: email,
      },
    },
    transactions: [
      {
        amount: {
          total: ((order.deliveryFee as number) + order.subTotal).toFixed(2),
          currency: currency,
        },
      },
    ],
    redirect_urls: {
      return_url: 'https://ayon-jodder.netlify.app/success',
      cancel_url: 'https://ayon-jodder.netlify.app/cancel',
    },
  }

  const createdPayment = await new Promise<paypal.Payment>(
    (resolve, reject) => {
      paypal.payment.create(paymentData, (error: any, payment: any) => {
        if (error) {
          reject(error)
        } else {
          resolve(payment)
        }
      })
    }
  )

  if (!createdPayment.links) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create PayPal payment'
    )
  }

  // Redirect the user to the PayPal payment approval URL
  const approvalUrl = createdPayment.links.find(
    (link: any) => link.rel === 'approval_url'
  )

  if (!approvalUrl) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to find PayPal approval URL'
    )
  }

  // Store the PayPal payment ID in your order model
  order.paymentMethod = 'PayPal'
  order.paymentId = createdPayment.id

  if (approvalUrl) {
    const url: OrderWithRedirect = { redirectUrl: approvalUrl.href }

    if (approvalUrl.href) {
      await order.save()
    }

    return url
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to create PayPal payment'
    )
  }
}

const handlePayPalWebhookForVerifyPayment = async (
  paymentId: string
): Promise<IOrder> => {
  // Retrieve the payment details from PayPal
  const payment = await new Promise<Payment>((resolve, reject) => {
    paypal.payment.get(paymentId, (error: any, retrievedPayment: Payment) => {
      if (error) {
        reject(error)
      } else {
        resolve(retrievedPayment)
      }
    })
  })

  let paymentStatus = ''
  let isPaid = false

  if ((payment as CustomPayment).payer?.status === 'VERIFIED') {
    // Handle the payment status update
    paymentStatus = (payment as CustomPayment).payer.status
    isPaid = paymentStatus === 'VERIFIED'
  }

  if (isPaid) {
    // Update the payment status in your application's database or order model
    const order = await orderModel.findOneAndUpdate(
      { paymentId: paymentId },
      { isPaid, paidAt: new Date() },
      { new: true }
    )
    if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')

    return order
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment failed')
  }
}

export const PaymentService = {
  stripePayment,
  paypalPayment,
  handlePayPalWebhookForVerifyPayment,
}
