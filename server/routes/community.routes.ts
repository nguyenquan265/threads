import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middleware'
import { communityWebhook } from '../controllers/community.controller'

const router = Router()

router.route('/').post(clerkMiddleware(), authenticate, communityWebhook)

export default router
