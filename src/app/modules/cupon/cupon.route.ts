import express from 'express'
import { CuponController } from './cupon.controller'

const router = express.Router()

router.post('/', CuponController.createCupon)
router.get('/code/:cuponCode', CuponController.getCuponByCode)
router.get('/verify/:cuponCode/:userId', CuponController.verifyCupon)
router.get('/:cuponId', CuponController.getCuponById)
router.get('/', CuponController.getAllCupons)
router.delete('/:cuponId', CuponController.deleteCuponById)

export const CuponRoute = router
