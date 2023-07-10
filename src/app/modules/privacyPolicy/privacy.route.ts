import express from 'express'
import { PrivacyController } from './privacy.controller'

const router = express.Router()

router.post('/', PrivacyController.createPrivacyPolicy)
router.get('/', PrivacyController.getPrivacyPolicy)

export const PrivacyPolicyRoute = router
