import express from 'express'
import { offerController } from './offer.controller'

const router = express.Router()

router.post('/', offerController.createOffer)
router.delete('/:id', offerController.deleteOfferById)
router.get('/', offerController.getOffer)

export const OfferRoute = router
