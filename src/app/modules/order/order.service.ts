// import mongoose from 'mongoose'
// import { IOrder } from './order.interface'

// const createOrder = async (orderData: IOrder): Promise<IOrder> => {
//   const { userId, orderItems, shippingAddress, ...rest } = orderData

//   const session = await mongoose.startSession()
//   try {
//     session.startTransaction()

//     await session.commitTransaction()
//     session.endSession()
//   } catch (error) {
//     await session.abortTransaction()
//     session.endSession()
//     throw error
//   }
// }

// export const OrderService = {
//   createOrder,
// }
