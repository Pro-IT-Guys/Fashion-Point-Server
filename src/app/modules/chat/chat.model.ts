import { Schema, model } from 'mongoose'
import { IChat, IChatModel } from './chat.interface'

const chatSchema = new Schema<IChat>({
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

const chatModel = model<IChat, IChatModel>('Chat', chatSchema)

export default chatModel
