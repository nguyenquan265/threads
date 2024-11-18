import { Router } from 'express'
import {
  communityWebhook,
  getCommunities,
  getCommunityDetails,
  getCommunityPosts
} from '../controllers/community.controller'

const router = Router()

router.route('/').get(getCommunities)
router.route('/webhook').post(communityWebhook)
router.route('/:clerkId').get(getCommunityDetails)
router.route('/:clerkId/posts').get(getCommunityPosts)

export default router
