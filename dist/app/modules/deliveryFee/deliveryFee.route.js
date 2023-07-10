'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.DeliveryFeeRoute = void 0
const express_1 = __importDefault(require('express'))
const deliveryFee_controller_1 = require('./deliveryFee.controller')
const router = express_1.default.Router()
router.post(
  '/get_fee',
  deliveryFee_controller_1.DeliveryFeeController.getFeeOfLocation
)
router.get('/all', deliveryFee_controller_1.DeliveryFeeController.getAllFees)
router.post('/', deliveryFee_controller_1.DeliveryFeeController.createFee)
router.patch('/:id', deliveryFee_controller_1.DeliveryFeeController.updateFee)
exports.DeliveryFeeRoute = router
