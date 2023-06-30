/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface IOrderItem {
  product: string
  quantity: number
  color: string
  size: string
}

export interface IShippingAddress {
  country: string
  state: string
  city?: string
  address_line?: string
}

export interface IOrder {
  userId: Types.ObjectId
  orderItems: IOrderItem[]
  phoneNumber: string
  email: string
  shippingAddress: IShippingAddress
  deliveryFee?: number // get from db
  deliveryStatus?: string // get from db
  subTotal: number
  paymentMethod?: string
  paymentId?: string
  isPaid: boolean
  paidAt?: Date
  deliveryAt?: Date
}

export interface IOrderModel extends Model<IOrder> {
  getOrderById(id: string): Promise<IOrder>
}
