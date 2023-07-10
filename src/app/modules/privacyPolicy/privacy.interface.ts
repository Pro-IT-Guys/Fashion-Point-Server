import { Model } from 'mongoose'

export interface IPrivacy {
  content: string
}

export type IPrivacyModel = Model<IPrivacy, Record<string, unknown>>
