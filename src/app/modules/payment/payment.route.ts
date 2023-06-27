import express from 'express'
import { PaymentController } from './payment.controller'

const router = express.Router()

router.post('/stripe', PaymentController.stripePayment)
router.post('/paypal', PaymentController.paypalPayment)

export const PaymentRoute = router
