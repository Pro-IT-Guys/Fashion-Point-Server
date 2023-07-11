import { Model, Types } from 'mongoose'

export interface IReview {
  userId: Types.ObjectId
  productId: Types.ObjectId
  rating: number
  comment: string
}

export interface IReviewCount {
  rating: number
  oneStar: number
  twoStar: number
  threeStar: number
  fourStar: number
  fiveStar: number
  review: IReview[]
}
export interface IReviewModel extends Model<IReview> {
  // eslint-disable-next-line no-unused-vars
  getReviewById(id: string): Promise<IReview>
}
