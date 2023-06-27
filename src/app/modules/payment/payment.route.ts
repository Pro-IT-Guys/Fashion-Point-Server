import express from 'express'
import { PaymentController } from './payment.controller'

const router = express.Router()

router.post('/stripe', PaymentController.stripePayment)
router.post('/paypal', PaymentController.paypalPayment)
router.post(
  '/paypal/webhook',
  PaymentController.handlePayPalWebhookForVerifyPayment
)

export const PaymentRoute = router
