import { z } from 'zod'
import { USER_ROLE_ARRAY } from './user.constant'

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z
        .string({
          required_error: 'First name is required',
        })
        .min(3)
        .max(50),
      lastName: z
        .string({
          required_error: 'Last name is required',
        })
        .min(3)
        .max(50),
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6)
      .max(10),
    image: z.string().optional(),
    phone: z.string().optional(),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    role: z.enum([...(USER_ROLE_ARRAY as [string, ...string[]])], {
      required_error: 'Role is required',
    }),
    address: z.string().optional(),
    shippingAddress: z.string().optional(),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
