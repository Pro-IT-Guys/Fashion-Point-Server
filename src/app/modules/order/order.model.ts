import { Schema, model } from 'mongoose'
import { IOrder, IOrderModel } from './order.interface'

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    shippingAddress: {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
      },
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      default: 'Pending',
    },
    subTotal: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    deliveryAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const orderModel = model<IOrder, IOrderModel>('Order', orderSchema)
export default orderModel
