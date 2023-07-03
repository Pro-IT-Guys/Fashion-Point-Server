import mongoose, { SortOrder } from 'mongoose'
import { IOrder, IOrderFilters } from './order.interface'
import { DeliveryFeeService } from '../deliveryFee/deliveryFee.service'
import orderModel from './order.model'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import { ORDER_SEARCH_FIELDS } from './order.constant'
import paginationHelper from '../../helpers/paginationHelper'

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

const getAllOrder = async (
  filters: IOrderFilters,
  paginationOption: IPaginationOption
): Promise<IGenericDataWithMeta<IOrder[]>> => {
  const { searchTerm } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: ORDER_SEARCH_FIELDS.map(field => ({
        [field]: new RegExp(searchTerm, 'i'),
      })),
    })
  }

  const whereCondition = andConditions.length ? { $and: andConditions } : {}

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const result = await orderModel
    .find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number)
  const total = await orderModel.countDocuments()

  const responseData = {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }

  return responseData
}

export const OrderService = {
  createOrder,
  getAllOrder,
}
