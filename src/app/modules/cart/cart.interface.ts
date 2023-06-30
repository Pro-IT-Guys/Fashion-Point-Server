/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface ICart {
  userId: Types.ObjectId
  product: { productId: Types.ObjectId; quantity: number }[]
}

export interface ICartModel extends Model<ICart> {
  getCartByUserId(userId: string): Promise<ICart>
}
