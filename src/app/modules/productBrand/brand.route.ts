import express from 'express'
import { BrandController } from './brand.controller'

const router = express.Router()

router.post('/', BrandController.createBrand)

export const BrandRoute = router
