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
exports.MessageController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const customResponse_1 = require('../../../shared/customResponse')
const message_service_1 = require('./message.service')
const createMessage = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, senderId, text } = req.body
    const message = yield message_service_1.MessageService.createMessage({
      chatId,
      senderId,
      text,
    })
    const responseData = {
      data: message,
      message: 'Message sent successfully',
    }
    ;(0, customResponse_1.sendSuccessResponse)(res, responseData)
  })
)
const getMessageByChatId = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params
    const messages = yield message_service_1.MessageService.getMessageByChatId(
      chatId
    )
    const responseData = {
      data: messages,
      message: 'Messages retrieved successfully',
    }
    ;(0, customResponse_1.sendSuccessResponse)(res, responseData)
  })
)
exports.MessageController = {
  createMessage,
  getMessageByChatId,
}
