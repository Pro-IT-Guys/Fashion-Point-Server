import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ReviewService } from './review.service'
import { sendSuccessResponse } from '../../../shared/customResponse'

const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = await ReviewService.createReview(req.body)
  const responseData = {
    data: review,
    message: 'Review submitted successfully',
  }
  sendSuccessResponse(res, responseData)
})

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params
  const review = await ReviewService.getAllReviews(productId)
  const responseData = {
    data: review,
    message: 'Review faced successfully',
  }
  sendSuccessResponse(res, responseData)
})

export const ReviewController = {
  createReview,
  getAllReviews,
}
