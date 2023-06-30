import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ICart } from './cart.interface'
import cartModel from './cart.model'

const addToCart = async (cartData: ICart): Promise<ICart> => {
  const isExist = await cartModel.findOne({ userId: cartData.userId })
  if (isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Cart already exist')

  const cart = await cartModel.create(cartData)
  if (!cart)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add items to cart')

  return cart
}

export const CartService = {
  addToCart,
}
