import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middleware'
import { addCommentToThread, createThread, getThreadByID, getThreads } from '../controllers/thread.controller'

const router = Router()

router.route('/').get(getThreads).post(clerkMiddleware(), authenticate, createThread)
router.route('/:id').get(getThreadByID)
router.route('/:id/comments').post(clerkMiddleware(), authenticate, addCommentToThread)

export default router
