import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'
import { getUser, getUserActivities, getUserPosts, getUsers, updateUser } from '../controllers/user.controller'
import { authenticate } from '../middlewares/auth.middleware'

const router = Router()

router.get('/', getUsers)
router.get('/:clerkId', getUser)
router.patch('/:clerkId', clerkMiddleware(), authenticate, updateUser)
router.get('/:clerkId/posts', getUserPosts)
router.get('/:objectId/activities', getUserActivities)

export default router
