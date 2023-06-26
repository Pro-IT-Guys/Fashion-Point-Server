import { Schema, model } from 'mongoose'
import { IOrder, IOrderModel } from './order.interface'

const orderItemSchema = new Schema(
  {
    product: {
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
  {
    _id: false,
  }
)

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [orderItemSchema],
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
      address_line: {
        type: String,
      },
    },
    deliveryFee: {
      type: Number,
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
