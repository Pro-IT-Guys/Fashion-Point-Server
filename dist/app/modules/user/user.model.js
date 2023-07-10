'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const user_constant_1 = require('./user.constant')
const nameSchema = new mongoose_1.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 3,
    },
  },
  { _id: false }
)
const userSchema = new mongoose_1.Schema(
  {
    name: nameSchema,
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: user_constant_1.USER_ROLE_ARRAY,
      required: true,
    },
    zipCode: {
      type: String,
    },
    shippingAddress: {
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      address_line: {
        type: String,
      },
    },
    verificationCode: {
      type: String,
      required: true,
    },
    codeGenerationTimestamp: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)
const userModel = (0, mongoose_1.model)('User', userSchema)
exports.default = userModel
