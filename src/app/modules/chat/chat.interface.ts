/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IChat {
  members: string[]
}

export interface IChatModel extends Model<IChat> {
  getChatByMembers(members: string[]): Promise<IChat>
  createChat(members: string[]): Promise<IChat>
}
