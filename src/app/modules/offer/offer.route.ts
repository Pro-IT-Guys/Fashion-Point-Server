import express from 'express'
import { offerController } from './offer.controller'

const router = express.Router()

router.post('/', offerController.createOffer)
router.get('/:id', offerController.getOfferById)

export const OfferRoute = router
