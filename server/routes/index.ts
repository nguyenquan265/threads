import { Router } from 'express'
import uploadRoutes from './upload.routes'
import userRoutes from './user.routes'
import threadRoutes from './thread.routes'

const router = Router()

router.use('/upload', uploadRoutes)
router.use('/users', userRoutes)
router.use('/threads', threadRoutes)

export default router
