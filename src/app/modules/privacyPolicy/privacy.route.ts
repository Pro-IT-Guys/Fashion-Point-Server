import express from 'express'
import { PrivacyController } from './privacy.controller'

const router = express.Router()

router.post('/', PrivacyController.createPrivacyPolicy)

export const PrivacyPolicyRoute = router
