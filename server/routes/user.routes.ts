import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'
import { getUser, getUserPosts, getUsers, updateUser } from '../controllers/user.controller'
import { authenticate } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', getUsers)
router.get('/:clerkId', getUser)
router.patch('/:clerkId', clerkMiddleware(), authenticate, updateUser)
router.get('/:clerkId/posts', getUserPosts)

export default router
