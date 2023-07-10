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
exports.LocationController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const customResponse_1 = require('../../../shared/customResponse')
const location_service_1 = require('./location.service')
const getCurrentLocation = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    let clientIp = req.headers['x-real-ip'] || req.connection.remoteAddress
    // Fallback for localhost IP address
    if (clientIp === '::1' || clientIp === '::ffff:127.0.0.1') {
      clientIp = '' // Leave it empty to let the IP geolocation service determine the IP automatically.Set to empty string to get public IP addressz
    }
    const geolocationURL = `http://ip-api.com/json/${clientIp}`
    const location =
      yield location_service_1.LocationService.getCurrentLocation(
        geolocationURL
      )
    const responseData = {
      message: 'Current location',
      data: location,
    }
    ;(0, customResponse_1.sendSuccessResponse)(res, responseData)
  })
)
exports.LocationController = {
  getCurrentLocation,
}
