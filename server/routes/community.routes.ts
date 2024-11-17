import { Router } from 'express'
import { communityWebhook, getCommunityDetails } from '../controllers/community.controller'

const router = Router()

router.route('/webhook').post(communityWebhook)
router.route('/:clerkId').get(getCommunityDetails)

export default router
