// import uploadHandler from '@/middlewares/upload.middleware'
import { requireAuth } from '@clerk/express'
import { Router } from 'express'

const router = Router()

router.use('/', requireAuth())

export default router
