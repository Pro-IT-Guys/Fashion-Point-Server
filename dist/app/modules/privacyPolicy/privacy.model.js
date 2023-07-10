'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const privacySchema = new mongoose_1.Schema({
  content: {
    type: String,
    required: true,
  },
})
const privacyModel = (0, mongoose_1.model)(`Privacy`, privacySchema)
exports.default = privacyModel
