'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.TypeRoute = void 0
const express_1 = __importDefault(require('express'))
const type_controller_1 = require('./type.controller')
const router = express_1.default.Router()
router.post('/', type_controller_1.TypeController.createType)
exports.TypeRoute = router
