'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const termsSchema = new mongoose_1.Schema({
  content: {
    type: String,
    required: true,
  },
})
const termsModel = (0, mongoose_1.model)(`Terms`, termsSchema)
exports.default = termsModel
