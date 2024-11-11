import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middleware'
import { createThread, getPosts } from '../controllers/thread.controller'

const router = Router()

router.get('/', getPosts)
router.post('/', clerkMiddleware(), authenticate, createThread)

export default router
