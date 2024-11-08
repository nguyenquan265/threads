import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middleware'
import { createThread } from '../controllers/thread.controller'

const router = Router()

router.post('/', clerkMiddleware(), authenticate, createThread)

export default router
