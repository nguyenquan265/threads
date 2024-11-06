// import { getUser, updateUser } from '@/controllers/user.controller'
// import { authenticate } from '@/middlewares/auth.middleware'
import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'
import { getUser, updateUser } from '../controllers/user.controller'
import { authenticate } from '../middlewares/auth.middleware'

const router = Router()

router.get('/')
router.get('/:clerkId', getUser)
router.patch('/:clerkId', clerkMiddleware(), authenticate, updateUser)

export default router
