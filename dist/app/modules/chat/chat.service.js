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
exports.ChatService = void 0
const http_status_1 = __importDefault(require('http-status'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const chat_model_1 = __importDefault(require('./chat.model'))
const createChat = members =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isChatExistWithBothIds = yield chat_model_1.default
      .findOne({
        members: {
          $all: [members.senderId, members.receiverId],
        },
      })
      .populate('members')
      .exec()
    if (isChatExistWithBothIds) {
      throw new ApiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'Chat already exists'
      )
    }
    const chat = (yield chat_model_1.default.create({
      members: [members.senderId, members.receiverId],
    })).populate('members')
    if (!chat) {
      throw new ApiError_1.default(
        http_status_1.default.INTERNAL_SERVER_ERROR,
        'Chat not created'
      )
    }
    return chat
  })
const getChatOfSender = senderId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chat_model_1.default
      .find({ members: senderId })
      .populate([
        {
          path: 'members',
        },
        {
          path: 'members',
        },
      ])
    if (!chats)
      throw new ApiError_1.default(
        http_status_1.default.INTERNAL_SERVER_ERROR,
        'Chats not found'
      )
    return chats
  })
const getChatOfSenderAndReceiver = (senderId, receiverId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chat_model_1.default
      .findOne({
        members: {
          $all: [senderId, receiverId],
        },
      })
      .populate([
        {
          path: 'members',
        },
        {
          path: 'members',
        },
      ])
    if (!chats)
      throw new ApiError_1.default(
        http_status_1.default.INTERNAL_SERVER_ERROR,
        'Chat not found'
      )
    return chats
  })
const getAllChat = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chat_model_1.default.find({}).populate([
      {
        path: 'members',
      },
      {
        path: 'members',
      },
    ])
    if (!chats)
      throw new ApiError_1.default(
        http_status_1.default.INTERNAL_SERVER_ERROR,
        'Chats not found'
      )
    return chats
  })
exports.ChatService = {
  createChat,
  getChatOfSender,
  getChatOfSenderAndReceiver,
  getAllChat,
}
