import { Schema, model } from 'mongoose'
import { IMessage, IMessageModel } from './message.interface'

const messageSchema = new Schema<IMessage>(
  {
    chatId: {
      type: Schema.Types.ObjectId,
    },
    senderId: {
      type: Schema.Types.ObjectId,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
)

const messageModel = model<IMessage, IMessageModel>('Message', messageSchema)

export default messageModel
