'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const orderItemSchema = new mongoose_1.Schema(
  {
    product: {
      type: mongoose_1.Schema.Types.ObjectId,
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
const orderSchema = new mongoose_1.Schema(
  {
    userId: {
      type: mongoose_1.Schema.Types.ObjectId,
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
      zipCode: {
        type: String,
      },
      address_line: {
        type: String,
      },
    },
    deliveryFee: {
      type: Number,
    },
    currency: {
      type: String,
      default: 'AED',
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
      default: 'Cash on delivery',
    },
    paymentId: {
      type: String,
    },
    isPaid: {
      type: String,
      default: 'no',
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
const orderModel = (0, mongoose_1.model)('Order', orderSchema)
exports.default = orderModel
