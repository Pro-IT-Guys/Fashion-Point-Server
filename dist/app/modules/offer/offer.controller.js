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
exports.offerController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const customResponse_1 = require('../../../shared/customResponse')
const offer_service_1 = require('./offer.service')
const createOffer = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const offerData = req.body
    const offer = yield offer_service_1.offerService.createOffer(offerData)
    const responseData = {
      data: offer,
      message: 'Offer created successfully',
    }
    ;(0, customResponse_1.sendSuccessResponse)(res, responseData)
  })
)
const getOffer = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield offer_service_1.offerService.getOffer()
    const responseData = {
      data: offer,
      message: 'Offer fetched successfully',
    }
    ;(0, customResponse_1.sendSuccessResponse)(res, responseData)
  })
)
const deleteOfferById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield offer_service_1.offerService.deleteOfferById(
      req.params.id
    )
    const responseData = {
      data: offer,
      message: 'Offer deleted successfully',
    }
    ;(0, customResponse_1.sendSuccessResponse)(res, responseData)
  })
)
exports.offerController = {
  createOffer,
  getOffer,
  deleteOfferById,
}
