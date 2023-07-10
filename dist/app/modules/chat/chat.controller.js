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
exports.ChatController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const chat_service_1 = require('./chat.service')
const customResponse_1 = require('../../../shared/customResponse')
const createChat = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId } = req.body
    const chat = yield chat_service_1.ChatService.createChat({
      senderId,
      receiverId,
    })
    const responseData = {
      data: chat,
      message: 'Chat created',
    }
    ;(0, customResponse_1.sendSuccessResponse)(res, responseData)
  })
)
const getChatOfSender = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { senderId } = req.params
    const chats = yield chat_service_1.ChatService.getChatOfSender(senderId)
    const responseData = {
      data: chats,
      message: 'Chats found',
    }
    ;(0, customResponse_1.sendSuccessResponse)(res, responseData)
  })
)
const getChatOfSenderAndReceiver = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverId } = req.params
    if (!senderId || !receiverId) {
      throw new Error('Sender and receiver id is required')
    }
    const chats = yield chat_service_1.ChatService.getChatOfSenderAndReceiver(
      senderId,
      receiverId
    )
    const responseData = {
      data: chats,
      message: 'Chats found',
    }
    ;(0, customResponse_1.sendSuccessResponse)(res, responseData)
  })
)
const getAllChat = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chat_service_1.ChatService.getAllChat()
    const responseData = {
      data: chats,
      message: 'All chats faced',
    }
    ;(0, customResponse_1.sendSuccessResponse)(res, responseData)
  })
)
exports.ChatController = {
  createChat,
  getChatOfSender,
  getChatOfSenderAndReceiver,
  getAllChat,
}
