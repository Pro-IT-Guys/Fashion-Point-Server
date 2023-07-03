import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { CartService } from './cart.service'

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const cartData = req.body
  const cart = await CartService.addToCart(cartData)

  const responseData = {
    data: cart,
    message: 'Items added to cart successfully',
  }
  sendSuccessResponse(res, responseData)
})

const updateCart = catchAsync(async (req: Request, res: Response) => {
  const cartId = req.params.id
  const cartData = req.body
  const cart = await CartService.updateCart(cartId, cartData)

  const responseData = {
    data: cart,
    message: 'Cart updated successfully',
  }
  sendSuccessResponse(res, responseData)
})

const bulkUpdateCart = catchAsync(async (req: Request, res: Response) => {
  const cartId = req.params.id
  const cartData = req.body
  const cart = await CartService.bulkUpdateCart(cartId, cartData)

  const responseData = {
    data: cart,
    message: 'Cart updated successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getCartByUserId = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const cart = await CartService.getCartByUserId(userId)

  const responseData = {
    data: cart,
    message: 'Cart fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getCartByCartId = catchAsync(async (req: Request, res: Response) => {
  const cartId = req.params.id
  const cart = await CartService.getCartByCartId(cartId)

  const responseData = {
    data: cart,
    message: 'Cart fetched successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const CartController = {
  addToCart,
  updateCart,
  bulkUpdateCart,
  getCartByUserId,
  getCartByCartId,
}
