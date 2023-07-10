'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.OrderService = void 0
const mongoose_1 = __importDefault(require('mongoose'))
const deliveryFee_service_1 = require('../deliveryFee/deliveryFee.service')
const order_model_1 = __importDefault(require('./order.model'))
const order_constant_1 = require('./order.constant')
const paginationHelper_1 = __importDefault(
  require('../../helpers/paginationHelper')
)
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const http_status_1 = __importDefault(require('http-status'))
const product_model_1 = __importDefault(require('../product/product.model'))
const createOrder = orderData =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { userId, orderItems, shippingAddress } = orderData,
      rest = __rest(orderData, ['userId', 'orderItems', 'shippingAddress'])
    const { country, state, city } = shippingAddress
    const session = yield mongoose_1.default.startSession()
    try {
      session.startTransaction()
      //   Firstly get the delivery fee of the location of shipping address
      const deliveryFeeData =
        yield deliveryFee_service_1.DeliveryFeeService.getFeeOfLocation(
          country,
          state,
          city
        )
      // const deliveryFee = deliveryFeeData.delivery_fee
      shippingAddress.country = deliveryFeeData.country
      shippingAddress.state = deliveryFeeData.state_name
      if (deliveryFeeData.city_name) {
        shippingAddress.city = deliveryFeeData.city_name
      }
      const order = (yield order_model_1.default.create(
        Object.assign({ userId, orderItems, shippingAddress }, rest)
      )).populate([
        { path: 'userId' },
        { path: 'orderItems.product', model: product_model_1.default },
      ])
      yield session.commitTransaction()
      session.endSession()
      return order
    } catch (error) {
      yield session.abortTransaction()
      session.endSession()
      throw error
    }
  })
const getAllOrder = (filters, paginationOption) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters
    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: order_constant_1.ORDER_SEARCH_FIELDS.map(field => ({
          [field]: new RegExp(searchTerm, 'i'),
        })),
      })
    }
    const whereCondition = andConditions.length ? { $and: andConditions } : {}
    const { page, limit, skip, sortBy, sortOrder } = (0,
    paginationHelper_1.default)(paginationOption)
    const sortCondition = {}
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder
    }
    const result = yield order_model_1.default
      .find(whereCondition)
      .populate([
        { path: 'userId' },
        { path: 'orderItems.product', model: product_model_1.default },
      ])
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
    const total = yield order_model_1.default.countDocuments()
    console.log('result', result)
    const responseData = {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
    return responseData
  })
const updateOrder = (orderId, orderData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield order_model_1.default.findOne({ _id: orderId })
    if (!isExist)
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Order not found'
      )
    if (orderData.shippingAddress) {
      const { country, state, city } = orderData.shippingAddress
      const deliveryFeeData =
        yield deliveryFee_service_1.DeliveryFeeService.getFeeOfLocation(
          country,
          state,
          city
        )
      orderData.shippingAddress.country = deliveryFeeData.country
      orderData.shippingAddress.state = deliveryFeeData.state_name
      if (deliveryFeeData.city_name) {
        orderData.shippingAddress.city = deliveryFeeData.city_name
      }
    }
    const updatedOrder = yield order_model_1.default
      .findOneAndUpdate({ _id: orderId }, orderData, { new: true })
      .populate([
        { path: 'userId' },
        { path: 'orderItems.product', model: product_model_1.default },
      ])
    if (!updatedOrder)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Order not updated'
      )
    return updatedOrder
  })
const getOrderByUserId = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default
      .find({ userId })
      .populate([
        { path: 'userId' },
        { path: 'orderItems.product', model: product_model_1.default },
      ])
      .exec()
    if (!orders)
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Order not found'
      )
    return orders
  })
const getOrderByOrderId = orderId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default
      .findById(orderId)
      .populate([
        { path: 'userId' },
        { path: 'orderItems.product', model: product_model_1.default },
      ])
    if (!order)
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Order not found'
      )
    return order
  })
exports.OrderService = {
  createOrder,
  getAllOrder,
  updateOrder,
  getOrderByUserId,
  getOrderByOrderId,
}
