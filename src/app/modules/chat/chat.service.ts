import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IChat } from './chat.interface'
import chatModel from './chat.model'

const createChat = async (members: {
  senderId: string
  receiverId: string
}): Promise<IChat> => {
  const isChatExistWithBothIds: IChat | null = await chatModel
    .findOne({
      members: {
        $all: [members.senderId, members.receiverId],
      },
    })
    .populate('members')
    .exec()

  if (isChatExistWithBothIds) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Chat already exists')
  }

  const chat = (
    await chatModel.create({
      members: [members.senderId, members.receiverId],
    })
  ).populate('members')

  if (!chat) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Chat not created')
  }

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

const getChatOfSenderAndReceiver = async (
  senderId: string,
  receiverId: string
): Promise<IChat[]> => {
  const chats = await chatModel
    .find({ members: [senderId, receiverId] })
    .populate([
      {
        path: 'members',
      },
      {
        path: 'members',
      },
    ])

  if (!chats || chats.length === 0)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Chats not found')

  return chats
}

export const ChatService = {
  createChat,
  getChatOfSender,
  getChatOfSenderAndReceiver,
}
