import mongoose, { SortOrder } from 'mongoose'
import { IOrder, IOrderFilters, IShippingAddress } from './order.interface'
import { DeliveryFeeService } from '../deliveryFee/deliveryFee.service'
import orderModel from './order.model'
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from '../../../interfaces/sharedInterface'
import { ORDER_SEARCH_FIELDS } from './order.constant'
import paginationHelper from '../../helpers/paginationHelper'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import productModel from '../product/product.model'

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
    // const deliveryFee = deliveryFeeData.delivery_fee
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
        ...rest,
      })
    ).populate([
      { path: 'userId' },
      { path: 'orderItems.product', model: productModel },
    ])

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
    .populate([
      { path: 'userId' },
      { path: 'orderItems.product', model: productModel },
    ])
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

const updateOrder = async (orderId: string, orderData: Partial<IOrder>) => {
  const isExist = await orderModel.findOne({ _id: orderId })
  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')

  if (orderData.shippingAddress) {
    const { country, state, city } =
      orderData.shippingAddress as IShippingAddress
    const deliveryFeeData = await DeliveryFeeService.getFeeOfLocation(
      country,
      state,
      city as string
    )
    orderData.shippingAddress.country = deliveryFeeData.country
    orderData.shippingAddress.state = deliveryFeeData.state_name
    if (deliveryFeeData.city_name) {
      orderData.shippingAddress.city = deliveryFeeData.city_name
    }
  }

  const updatedOrder = await orderModel
    .findOneAndUpdate({ _id: orderId }, orderData, { new: true })
    .populate([
      { path: 'userId' },
      { path: 'orderItems.product', model: productModel },
    ])

  if (!updatedOrder)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order not updated')
  return updatedOrder
}

const getOrderByUserId = async (userId: string): Promise<IOrder[]> => {
  const orders = await orderModel
    .find({ userId })
    .populate([
      { path: 'userId' },
      { path: 'orderItems.product', model: productModel },
    ])
    .exec()

  if (!orders) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')

  return orders
}

const getOrderByOrderId = async (orderId: string): Promise<IOrder> => {
  const order = await orderModel
    .findById(orderId)
    .populate([
      { path: 'userId' },
      { path: 'orderItems.product', model: productModel },
    ])
  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found')
  return order
}

export const OrderService = {
  createOrder,
  getAllOrder,
  updateOrder,
  getOrderByUserId,
  getOrderByOrderId,
}
