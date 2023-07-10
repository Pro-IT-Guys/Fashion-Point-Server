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
exports.MessageService = void 0
const http_status_1 = __importDefault(require('http-status'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const message_model_1 = __importDefault(require('./message.model'))
const chat_model_1 = __importDefault(require('../chat/chat.model'))
const createMessage = messageData =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, senderId } = messageData
    const chatData = yield chat_model_1.default
      .findById(chatId)
      .populate('members')
      .where('members')
      .in([senderId])
    if (!chatData)
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Chat not found'
      )
    const message = (yield message_model_1.default.create(
      messageData
    )).populate([
      {
        path: 'chatId',
      },
      {
        path: 'senderId',
      },
    ])
    if (!message)
      throw new ApiError_1.default(
        http_status_1.default.INTERNAL_SERVER_ERROR,
        'Message not sent'
      )
    return message
  })
const getMessageByChatId = chatId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield message_model_1.default
      .find({ chatId })
      .populate([
        {
          path: 'chatId',
        },
        {
          path: 'senderId',
        },
      ])
      .sort({ createdAt: 1 })
    if (!messages)
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Messages not found'
      )
    return messages
  })
exports.MessageService = {
  createMessage,
  getMessageByChatId,
}
