'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.locationRoute = void 0
const express_1 = __importDefault(require('express'))
const location_controller_1 = require('./location.controller')
const router = express_1.default.Router()
router.get('/', location_controller_1.LocationController.getCurrentLocation)
exports.locationRoute = router
