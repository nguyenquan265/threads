import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'
import { getUser, getUserActivities, getUserPosts, getUsers, updateUser } from '../controllers/user.controller'
import { authenticate } from '../middlewares/auth.middleware'

const router = Router()

router.route('/').get(getUsers)
router.route('/:clerkId').get(getUser).patch(clerkMiddleware(), authenticate, updateUser)
router.route('/:clerkId/posts').get(getUserPosts)
router.route('/:objectId/activities').get(getUserActivities)

export default router
