import express from 'express'
import { ReviewController } from './review.controller'

const router = express.Router()

router.post('/', ReviewController.createReview)
router.post('/reviwe_count', ReviewController.getAllReviews)

export const ReviewRoute = router
