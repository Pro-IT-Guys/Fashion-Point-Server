import mongoose from 'mongoose'
import { IOrder } from './order.interface'
import { DeliveryFeeService } from '../deliveryFee/deliveryFee.service'
import orderModel from './order.model'

const createOrder = async (orderData: IOrder): Promise<IOrder> => {
  const { userId, orderItems, shippingAddress, ...rest } = orderData
  const { country, state, city } = shippingAddress

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    //   Firstly get the delivery fee of the location of shipping address
    const deliveryFeeData = await DeliveryFeeService.getFeeOfLocation(
      country,
      state,
      city as string
    )
    const deliveryFee = deliveryFeeData.delivery_fee
    shippingAddress.country = deliveryFeeData.country
    shippingAddress.state = deliveryFeeData.state_name
    if (deliveryFeeData.city_name) {
      shippingAddress.city = deliveryFeeData.city_name
    }

    const order = (
      await orderModel.create({
        userId,
        orderItems,
        shippingAddress,
        deliveryFee,
        ...rest,
      })
    ).populate('orderItems.product')

    await session.commitTransaction()
    session.endSession()

    return order
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

export const OrderService = {
  createOrder,
}
