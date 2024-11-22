import { Router } from 'express'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'
import { getConversations, getMessages, sendMessage } from '../controllers/message.controller'

const router = Router()

router.route('/').post(clerkMiddleware(), authenticate, sendMessage)
router.route('/conversations').get(clerkMiddleware(), authenticate, getConversations)
router.route('/:otherUserId').get(clerkMiddleware(), authenticate, getMessages)

export default router
