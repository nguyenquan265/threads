import { updateUser } from '@/controllers/user.controller'
import { authenticate } from '@/middlewares/auth.middleware'
import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'

const router = Router()

router.get('/')
router.get('/:id')
router.patch('/:clerkId', clerkMiddleware(), authenticate, updateUser)

export default router
