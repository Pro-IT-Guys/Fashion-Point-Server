import Stripe from 'stripe'
import config from '../../../config'
import orderModel from '../order/order.model'

const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2022-11-15',
})

const processPayment = async (
  orderId: string,
  paymentMethodId: string,
  currency: string
): Promise<void> => {
  const order = await orderModel.findById(orderId)

  if (!order) {
    throw new Error('Order not found')
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
    order.paymentMethod = paymentMethodId
    order.isPaid = true
    order.paidAt = new Date()

    await order.save()
  } else {
    throw new Error('Payment failed')
  }
}

export const PaymentService = {
  processPayment,
}
