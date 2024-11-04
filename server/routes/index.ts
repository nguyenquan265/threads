import { Router } from 'express'
import uploadRoutes from './upload.routes'
import userRoutes from './user.routes'

const router = Router()

router.use('/upload', uploadRoutes)
router.use('/users', userRoutes)

export default router
