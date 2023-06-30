import { Schema, model } from 'mongoose'
import { IReview, IReviewModel } from './review.interface'

const reviewSchema = new Schema<IReview>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
})

const reviewModel = model<IReview, IReviewModel>(`Review`, reviewSchema)
export default reviewModel
