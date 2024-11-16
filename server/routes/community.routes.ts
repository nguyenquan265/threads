import { Router } from 'express'
import { communityWebhook } from '../controllers/community.controller'

const router = Router()

router.route('/').post(communityWebhook)

export default router
