import express from 'express'
import verifyAdmin from '../../middlewares/verifyAdmin'
import { UserController } from './user.controller'

const router = express.Router()

router.get('/', verifyAdmin, UserController.getAllUsers)

export const UserRoute = router
