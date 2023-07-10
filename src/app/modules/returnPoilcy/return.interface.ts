import { Model } from 'mongoose'

export interface IReturn {
  content: string
}

export type IReturnModel = Model<IReturn, Record<string, unknown>>
