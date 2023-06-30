import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ICart } from './cart.interface'
import cartModel from './cart.model'

const addToCart = async (cartData: ICart): Promise<ICart> => {
  const isExist = await cartModel.findOne({ userId: cartData.userId })
  if (isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Cart already exist')

  const cart = await cartModel.create(cartData)
  await cart.populate('product.productId')

  if (!cart)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add items to cart')

  return cart
}

const updateCart = async (
  cartId: string,
  cartData: Partial<ICart>
): Promise<ICart> => {
  const isExist = await cartModel.findById(cartId)
  if (!isExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Cart not found')

  const cart = await cartModel
    .findByIdAndUpdate(cartId, cartData, {
      new: true,
    })
    .populate('product.productId')

  if (!cart) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update cart')

  return cart
}

const getCartByUserId = async (userId: string): Promise<ICart> => {
  const cart = await cartModel.findOne({ userId }).populate('product.productId')

  if (!cart) throw new ApiError(httpStatus.BAD_REQUEST, 'Cart not found')
  return cart
}

const getCartByCartId = async (cartId: string): Promise<ICart> => {
  const cart = await cartModel.findById(cartId).populate('product.productId')
  if (!cart) throw new ApiError(httpStatus.BAD_REQUEST, 'Cart not found')
  return cart
}

export const CartService = {
  addToCart,
  updateCart,
  getCartByUserId,
  getCartByCartId,
}
