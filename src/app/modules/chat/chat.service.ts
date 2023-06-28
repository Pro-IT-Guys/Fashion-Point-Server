import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IChat } from './chat.interface'
import chatModel from './chat.model'

const createChat = async (members: {
  senderId: string
  receiverId: string
}): Promise<IChat> => {
  const isReceiverExist = await chatModel.exists({
    members: members.receiverId,
  })

  if (isReceiverExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chat already exist')
  }

  const chat = (
    await chatModel.create({
      members: [members.senderId, members.receiverId],
    })
  ).populate([
    {
      path: 'members',
    },
    {
      path: 'members',
    },
  ])

  if (!chat)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Chat not created')

  return chat
}

const getChatOfSender = async (senderId: string): Promise<IChat[]> => {
  const chats = await chatModel.find({ members: senderId }).populate([
    {
      path: 'members',
    },
    {
      path: 'members',
    },
  ])

  if (!chats)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Chats not found')

  return chats
}

export const ChatService = {
  createChat,
  getChatOfSender,
}
