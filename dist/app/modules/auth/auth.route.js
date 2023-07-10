'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AuthRoute = void 0
const express_1 = __importDefault(require('express'))
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest')
)
const user_validation_1 = require('../user/user.validation')
const auth_controller_1 = require('./auth.controller')
const router = express_1.default.Router()
router.post(
  '/',
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.createUserZodSchema
  ),
  auth_controller_1.AuthController.signupUser
)
router.post('/verify', auth_controller_1.AuthController.verifyOtp)
router.post('/resend_otp', auth_controller_1.AuthController.resendOtp)
router.post('/login', auth_controller_1.AuthController.loginUser)
router.get('/me', auth_controller_1.AuthController.loggedInUser)
exports.AuthRoute = router
