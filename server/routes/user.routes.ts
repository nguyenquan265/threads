import { updateUser } from '@/controllers/user.controller'
import { clerkMiddleware } from '@clerk/express'
import { Router } from 'express'

const router = Router()

router.get('/')
router.get('/:id')
router.patch('/:clerkId', clerkMiddleware(), updateUser)

export default router
