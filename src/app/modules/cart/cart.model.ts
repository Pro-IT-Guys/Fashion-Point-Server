import { Schema, model } from 'mongoose'
import { ICart, ICartModel } from './cart.interface'

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: [
      {
        _id: false,
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)

const cartModel = model<ICart, ICartModel>('Cart', cartSchema)
export default cartModel
