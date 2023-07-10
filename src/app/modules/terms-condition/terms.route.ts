import express from 'express'
import { TermsConditionController } from './terms.controller'

const router = express.Router()

router.post('/', TermsConditionController.createTermsCondition)
router.get('/', TermsConditionController.getTermsCondition)

export const TermsConditionRoute = router
