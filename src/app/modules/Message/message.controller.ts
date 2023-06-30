import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { sendSuccessResponse } from '../../../shared/customResponse'
import { MessageService } from './message.service'

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const { chatId, senderId, text } = req.body
  const message = await MessageService.createMessage({
    chatId,
    senderId,
    text,
  })

  const responseData = {
    data: message,
    message: 'Message sent successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getMessageByChatId = catchAsync(async (req: Request, res: Response) => {
  const { chatId } = req.params
  const messages = await MessageService.getMessageByChatId(chatId)

  const responseData = {
    data: messages,
    message: 'Messages retrieved successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const MessageController = {
  createMessage,
  getMessageByChatId,
}
