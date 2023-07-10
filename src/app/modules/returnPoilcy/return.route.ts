import express from 'express'
import { ReturnPolicyController } from './return.controller'

const router = express.Router()

router.post('/', ReturnPolicyController.createReturnPolicy)
router.get('/', ReturnPolicyController.getReturnPolicy)

export const ReturnPolicyRoute = router
