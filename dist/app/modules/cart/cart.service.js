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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.CartService = void 0
const http_status_1 = __importDefault(require('http-status'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const cart_model_1 = __importDefault(require('./cart.model'))
const addToCart = cartData =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cart_model_1.default.findOne({
      userId: cartData.userId,
    })
    if (isExist)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Cart already exists'
      )
    const cart = yield cart_model_1.default.create(cartData)
    yield cart.populate('product.productId')
    if (!cart)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to add items to cart'
      )
    return cart
  })
const updateCart = (cartId, cartData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cart_model_1.default.findById(cartId)
    if (!isExist)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Cart not found'
      )
    const existingCart = yield cart_model_1.default
      .findById(cartId)
      .populate('product.productId')
    if (existingCart) {
      if (cartData.product) {
        const updatedProduct = cartData.product[0] // passing only one product at a time
        // Check if the existing cart already contains the same productId
        const existingProductIndex = existingCart.product.findIndex(item =>
          item.productId.equals(updatedProduct.productId)
        )
        if (existingProductIndex !== -1) {
          // If productId already exists, update the quantity
          existingCart.product[existingProductIndex].quantity =
            updatedProduct.quantity
        } else {
          // If productId is different, add the new product to the array
          existingCart.product.push(updatedProduct)
        }
        const cart = yield cart_model_1.default
          .findByIdAndUpdate(
            cartId,
            { product: existingCart.product },
            { new: true }
          )
          .populate('product.productId')
        if (!cart)
          throw new ApiError_1.default(
            http_status_1.default.BAD_REQUEST,
            'Failed to update cart'
          )
        return cart
      }
    }
    throw new ApiError_1.default(
      http_status_1.default.BAD_REQUEST,
      'Cart not found'
    )
  })
const bulkUpdateCart = (cartId, cartData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cart_model_1.default.findById(cartId)
    if (!isExist)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Cart not found'
      )
    const updatedCart = yield cart_model_1.default.findByIdAndUpdate(
      cartId,
      { $set: { product: cartData.product } },
      { new: true }
    )
    if (!updatedCart)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Failed to update cart'
      )
    return updatedCart
  })
const getCartByUserId = userId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default
      .findOne({ userId })
      .populate('product.productId')
    console.log(cart)
    if (!cart)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Cart not found'
      )
    return cart
  })
const getCartByCartId = cartId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default
      .findById(cartId)
      .populate('product.productId')
    if (!cart)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Cart not found'
      )
    return cart
  })
const deleteCart = cartId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findByIdAndDelete(cartId)
    if (!cart)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Cart not found'
      )
    return cart
  })
const deleteAProductFromCart = (cartId, productId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.findById(cartId)
    if (!cart)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Cart not found'
      )
    const existingCart = yield cart_model_1.default
      .findById(cartId)
      .populate('product.productId')
    if (existingCart) {
      const existingProductIndex = existingCart.product.findIndex(item =>
        item.productId.equals(productId)
      )
      if (existingProductIndex !== -1) {
        existingCart.product.splice(existingProductIndex, 1)
      }
      const cart = yield cart_model_1.default
        .findByIdAndUpdate(
          cartId,
          { product: existingCart.product },
          { new: true }
        )
        .populate('product.productId')
      if (!cart)
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to update cart'
        )
      return cart
    }
    throw new ApiError_1.default(
      http_status_1.default.BAD_REQUEST,
      'Cart not found'
    )
  })
exports.CartService = {
  addToCart,
  updateCart,
  bulkUpdateCart,
  getCartByUserId,
  getCartByCartId,
  deleteCart,
  deleteAProductFromCart,
}
