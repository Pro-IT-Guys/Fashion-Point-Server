'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.CartRoute = void 0
const express_1 = __importDefault(require('express'))
const cart_controller_1 = require('./cart.controller')
const router = express_1.default.Router()
router.post('/', cart_controller_1.CartController.addToCart)
router.patch('/:id', cart_controller_1.CartController.updateCart)
router.patch('/bulk/:id', cart_controller_1.CartController.bulkUpdateCart)
router.get('/user/:id', cart_controller_1.CartController.getCartByUserId)
router.get('/:id', cart_controller_1.CartController.getCartByCartId)
router.delete(
  '/remove/:id/:productId',
  cart_controller_1.CartController.deleteAProductFromCart
)
router.delete('/:id', cart_controller_1.CartController.deleteCart)
exports.CartRoute = router
