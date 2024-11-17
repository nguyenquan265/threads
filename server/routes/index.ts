import { Router } from 'express'
import uploadRoutes from './upload.routes'
import userRoutes from './user.routes'
import threadRoutes from './thread.routes'
import communityRoutes from './community.routes'

const router = Router()

router.use('/upload', uploadRoutes)
router.use('/users', userRoutes)
router.use('/threads', threadRoutes)
router.use('/communities', communityRoutes)

export default router
