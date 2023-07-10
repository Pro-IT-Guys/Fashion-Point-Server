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
exports.LocationService = void 0
const request_promise_1 = __importDefault(require('request-promise'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const http_status_1 = __importDefault(require('http-status'))
const getCurrentLocation = geolocationURL =>
  __awaiter(void 0, void 0, void 0, function* () {
    const body = yield (0, request_promise_1.default)({
      url: geolocationURL,
      json: true,
    })
    if (!body)
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Location not found'
      )
    const country = body.country
    const city = body.city
    return { country, city }
  })
exports.LocationService = {
  getCurrentLocation,
}
