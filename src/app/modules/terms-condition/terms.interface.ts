import { Model } from 'mongoose'

export interface ITerms {
  content: string
}

export type ITermsModel = Model<ITerms, Record<string, unknown>>;