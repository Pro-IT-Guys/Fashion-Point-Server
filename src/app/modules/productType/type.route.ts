import express from 'express'
import { TypeController } from './type.controller'

const router = express.Router()

router.post('/', TypeController.createType)

export const TypeRoute = router
