'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const brandSchema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
)
const brandModel = (0, mongoose_1.model)('ProductBrand', brandSchema)
exports.default = brandModel
