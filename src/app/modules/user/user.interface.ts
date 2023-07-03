/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLE_ENUM } from './user.constant'
import { IShippingAddress } from '../order/order.interface'

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
  shippingAddress?: IShippingAddress
  verificationCode: string
  zipCode?: string
  codeGenerationTimestamp: string
  isVerified: boolean
}

export interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser>
}

export interface IUserFilters {
  searchTerm?: string
}
