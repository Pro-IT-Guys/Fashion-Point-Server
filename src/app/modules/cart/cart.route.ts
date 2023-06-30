import express from 'express'
import { CartController } from './cart.controller'

const router = express.Router()

router.post('/', CartController.addToCart)
router.patch('/:id', CartController.updateCart)
router.get('/user/:id', CartController.getCartByUserId)
router.get('/:id', CartController.getCartByCartId)

export const CartRoute = router
