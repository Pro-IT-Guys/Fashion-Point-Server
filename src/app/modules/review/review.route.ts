import express from 'express'
import { ReviewController } from './review.controller'

const router = express.Router()

router.post('/', ReviewController.createReview)
router.get('/:productId', ReviewController.getAllReviews)

export const ReviewRoute = router
