import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ChatService } from './chat.service'
import { sendSuccessResponse } from '../../../shared/customResponse'

const createChat = catchAsync(async (req: Request, res: Response) => {
  const { senderId, receiverId } = req.body
  const chat = await ChatService.createChat({ senderId, receiverId })

  const responseData = {
    data: chat,
    message: 'Chat created',
  }
  sendSuccessResponse(res, responseData)
})

const getChatOfSender = catchAsync(async (req: Request, res: Response) => {
  const { senderId } = req.params
  const chats = await ChatService.getChatOfSender(senderId)

  const responseData = {
    data: chats,
    message: 'Chats found',
  }
  sendSuccessResponse(res, responseData)
})

const getChatOfSenderAndReceiver = catchAsync(
  async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.params

    if (!senderId || !receiverId) {
      throw new Error('Sender and receiver id is required')
    }

    const chats = await ChatService.getChatOfSenderAndReceiver(
      senderId as string,
      receiverId as string
    )

    const responseData = {
      data: chats,
      message: 'Chats found',
    }
    sendSuccessResponse(res, responseData)
  }
)

export const ChatController = {
  createChat,
  getChatOfSender,
  getChatOfSenderAndReceiver,
}
