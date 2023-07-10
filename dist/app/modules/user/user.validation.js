'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserValidation = void 0
const zod_1 = require('zod')
const user_constant_1 = require('./user.constant')
const createUserZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.object({
      firstName: zod_1.z
        .string({
          required_error: 'First name is required',
        })
        .min(3)
        .max(50),
      lastName: zod_1.z
        .string({
          required_error: 'Last name is required',
        })
        .min(3)
        .max(50),
    }),
    password: zod_1.z.string({
      required_error: 'Password is required',
    }),
    image: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    role: zod_1.z.enum([...user_constant_1.USER_ROLE_ARRAY], {
      required_error: 'Role is required',
    }),
    address: zod_1.z.string().optional(),
    shippingAddress: zod_1.z.string().optional(),
  }),
})
exports.UserValidation = {
  createUserZodSchema,
}
