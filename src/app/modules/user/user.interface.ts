/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLE_ENUM } from './user.constant'

export interface IUser {
  name: {
    firsName: string
    lastName: string
  }
  password: string
  image?: string
  phone?: string
  email: string
  role: USER_ROLE_ENUM
  address?: string
  shippingAddress?: string
  verificationCode: string | undefined
  codeGenerationTimestamp: string | undefined
}

export interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser>
}
