import { Router } from 'express'
import { ChatController } from './chat.controller'

const router = Router()

router.post('/', ChatController.createChat)
router.get('/:senderId', ChatController.getChatOfSender)

export const ChatRoute = router
