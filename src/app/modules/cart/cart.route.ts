import express from 'express'
import { CartController } from './cart.controller'

const router = express.Router()

router.post('/', CartController.addToCart)

export const CartRoute = router
