import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middleware'
import { addCommentToThread, createThread, getThreadByID, getThreads } from '../controllers/thread.controller'

const router = Router()

router.get('/', getThreads)
router.post('/', clerkMiddleware(), authenticate, createThread)
router.get('/:id', getThreadByID)
router.post('/:id/comments', clerkMiddleware(), authenticate, addCommentToThread)

export default router
