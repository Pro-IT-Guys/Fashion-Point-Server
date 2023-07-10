'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const messageSchema = new mongoose_1.Schema(
  {
    chatId: {
      type: mongoose_1.Schema.Types.ObjectId,
    },
    senderId: {
      type: mongoose_1.Schema.Types.ObjectId,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
)
const messageModel = (0, mongoose_1.model)('Message', messageSchema)
exports.default = messageModel
