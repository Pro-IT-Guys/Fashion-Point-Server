/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface IOffer {
  title: string
  product: Types.ObjectId[]
  image: string
  discountPrice: number
  startFrom: Date
  endAt: Date
  isVisible: boolean
}

export interface IAddId extends IOffer {
  _id: string
}

export interface IOfferModel extends Model<IOffer> {
  getOfferById(id: string): Promise<IOffer>
}
