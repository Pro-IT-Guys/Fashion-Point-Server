import express from 'express'
import { TermsConditionController } from './terms.controller'

const router = express.Router()

router.post('/', TermsConditionController.createTermsCondition)

export const TermsConditionRoute = router
