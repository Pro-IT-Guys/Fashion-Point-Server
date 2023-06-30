import { Model, Types } from 'mongoose'

export interface IReview {
  userId: Types.ObjectId
  productId: Types.ObjectId
  rating: number
  comment: string
}

export interface IReviewModel extends Model<IReview> {
  // eslint-disable-next-line no-unused-vars
  getReviewById(id: string): Promise<IReview>
}
