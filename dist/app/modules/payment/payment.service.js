'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.PaymentService = void 0
/* eslint-disable @typescript-eslint/no-explicit-any */
const stripe_1 = __importDefault(require('stripe'))
const paypal_rest_sdk_1 = __importDefault(require('paypal-rest-sdk'))
const config_1 = __importDefault(require('../../../config'))
const order_model_1 = __importDefault(require('../order/order.model'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const http_status_1 = __importDefault(require('http-status'))
const stripe = new stripe_1.default(config_1.default.stripe_secret_key, {
  apiVersion: '2022-11-15',
})
const stripePayment = (orderId, paymentMethodId, currency) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(orderId)
    if (!order)
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Order not found'
      )
    if (order.isPaid === 'yes')
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'You have already paid'
      )
    // Fetch the payment method details from Stripe
    const paymentMethod = yield stripe.paymentMethods.retrieve(paymentMethodId)
    // Check if the payment method exists and is of type 'card'
    if (!paymentMethod || paymentMethod.type !== 'card') {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Invalid payment method'
      )
    }
    // Create a payment intent using Stripe
    const paymentIntent = yield stripe.paymentIntents.create({
      amount: (order.deliveryFee + order.subTotal) * 100,
      currency: currency,
      payment_method: paymentMethodId,
      confirm: true,
    })
    // Check if the payment was successful
    if (paymentIntent.status === 'succeeded') {
      order.isPaid = 'yes'
      order.paidAt = new Date()
      // Set the payment method string to the order.paymentMethod field
      if (paymentMethod.card) {
        order.paymentMethod = paymentMethod.card.brand
        order.paymentId = paymentIntent.id
      } else {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Card information missing'
        )
      }
      const newOrder = yield order.save()
      return newOrder
    } else {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Payment failed'
      )
    }
  })
paypal_rest_sdk_1.default.configure({
  mode: config_1.default.paypal_mode,
  client_id: config_1.default.paypal_client_id,
  client_secret: config_1.default.paypal_secret_key,
})
const paypalPayment = (orderId, email, currency) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(orderId)
    if (!order) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Order not found'
      )
    }
    if (order.isPaid === 'yes')
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'You have already paid'
      )
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
            total: (order.deliveryFee + order.subTotal).toFixed(2),
            currency: currency,
          },
        },
      ],
      redirect_urls: {
        return_url: 'https://ayon-jodder.netlify.app/success',
        cancel_url: 'https://ayon-jodder.netlify.app/cancel',
      },
    }
    const createdPayment = yield new Promise((resolve, reject) => {
      paypal_rest_sdk_1.default.payment.create(
        paymentData,
        (error, payment) => {
          if (error) {
            reject(error)
          } else {
            resolve(payment)
          }
        }
      )
    })
    if (!createdPayment.links) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create PayPal payment'
      )
    }
    // Redirect the user to the PayPal payment approval URL
    const approvalUrl = createdPayment.links.find(
      link => link.rel === 'approval_url'
    )
    if (!approvalUrl) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to find PayPal approval URL'
      )
    }
    // Store the PayPal payment ID in your order model
    order.paymentMethod = 'PayPal'
    order.paymentId = createdPayment.id
    if (approvalUrl) {
      const url = { redirectUrl: approvalUrl.href }
      if (approvalUrl.href) {
        yield order.save()
      }
      return url
    } else {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to create PayPal payment'
      )
    }
  })
const handlePayPalWebhookForVerifyPayment = paymentId =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a
    // Retrieve the payment details from PayPal
    const payment = yield new Promise((resolve, reject) => {
      paypal_rest_sdk_1.default.payment.get(
        paymentId,
        (error, retrievedPayment) => {
          if (error) {
            reject(error)
          } else {
            resolve(retrievedPayment)
          }
        }
      )
    })
    let paymentStatus = ''
    let isPaid = false
    if (
      ((_a = payment.payer) === null || _a === void 0 ? void 0 : _a.status) ===
      'VERIFIED'
    ) {
      // Handle the payment status update
      paymentStatus = payment.payer.status
      isPaid = paymentStatus === 'VERIFIED'
    }
    if (isPaid) {
      // Update the payment status in your application's database or order model
      const order = yield order_model_1.default.findOneAndUpdate(
        { paymentId: paymentId },
        { isPaid, paidAt: new Date() },
        { new: true }
      )
      if (!order)
        throw new ApiError_1.default(
          http_status_1.default.NOT_FOUND,
          'Order not found'
        )
      return order
    } else {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Payment failed'
      )
    }
  })
exports.PaymentService = {
  stripePayment,
  paypalPayment,
  handlePayPalWebhookForVerifyPayment,
}
