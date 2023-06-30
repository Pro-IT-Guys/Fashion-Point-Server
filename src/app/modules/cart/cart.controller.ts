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

export const CartController = {
  addToCart,
}
