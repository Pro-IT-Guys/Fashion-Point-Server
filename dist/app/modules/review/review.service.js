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
exports.ReviewService = void 0
const http_status_1 = __importDefault(require('http-status'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const review_model_1 = __importDefault(require('./review.model'))
const mongoose_1 = __importDefault(require('mongoose'))
const product_model_1 = __importDefault(require('../product/product.model'))
const createReview = review =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield review_model_1.default.findOne({
      userId: review.userId,
      productId: review.productId,
    })
    if (isExist)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        `You already reviewed this product`
      )
    let newReview = null
    const session = yield mongoose_1.default.startSession()
    try {
      session.startTransaction()
      newReview = yield review_model_1.default.create(review)
      yield newReview.populate('userId')
      if (!newReview)
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          `Review not submitted`
        )
      //   update the product review
      const product = yield product_model_1.default.findById(review.productId)
      if (!product)
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          `Product not found`
        )
      //   keep the previous review and add the new review in the product review
      const newProductReview = [...(product.review || []), newReview._id]
      const updatedProduct = yield product_model_1.default.findByIdAndUpdate(
        review.productId,
        { review: newProductReview },
        { new: true }
      )
      if (!updatedProduct)
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          `Something went wrong while submitting review`
        )
      session.commitTransaction()
      session.endSession()
    } catch (error) {
      yield session.abortTransaction()
      session.endSession()
      throw error
    }
    return newReview
  })
exports.ReviewService = {
  createReview,
}
