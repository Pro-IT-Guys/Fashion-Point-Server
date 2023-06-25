import express from 'express'
import { LocationController } from './location.controller'

const router = express.Router()

router.get('/', LocationController.getCurrentLocation)

export const locationRoute = router
