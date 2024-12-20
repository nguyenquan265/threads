import { Webhook, WebhookRequiredHeaders } from 'svix'
import { IncomingHttpHeaders } from 'http'
import {
  addMemberToCommunity,
  createCommunity,
  deleteCommunity,
  removeUserFromCommunity,
  updateCommunityInfo
} from './community.webhook'
import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/ApiError'
import asyncHandler from '../utils/asyncHandler'
import { FilterQuery, SortOrder } from 'mongoose'
import Community from '../models/community.model'
import User from '../models/user.model'
import Thread from '../models/thread.model'

type EventType =
  | 'organization.created'
  | 'organizationInvitation.created'
  | 'organizationMembership.created'
  | 'organizationMembership.deleted'
  | 'organization.updated'
  | 'organization.deleted'

type Event = {
  data: Record<string, string | number | Record<string, string>[]>
  object: 'event'
  type: EventType
}

export const communityWebhook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body
  const header = req.headers

  const heads = {
    'svix-id': header['svix-id'],
    'svix-timestamp': header['svix-timestamp'],
    'svix-signature': header['svix-signature']
  }

  // Activitate Webhook in the Clerk Dashboard.
  // After adding the endpoint, you'll see the secret on the right side.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  let evnt: Event | null = null

  // try {
  //   evnt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event
  // } catch (err) {
  //   console.log(err)

  //   return next(new ApiError(400, 'Invalid webhook signature'))
  // }

  evnt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event

  if (!evnt) {
    throw new ApiError(400, 'Invalid webhook signature')
  }

  const eventType: EventType = evnt?.type!

  // Listen organization creation event
  if (eventType === 'organization.created') {
    // Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/CreateOrganization
    // Show what evnt?.data sends from above resource
    const { id, name, slug, logo_url, image_url, created_by } = evnt?.data ?? {}

    try {
      // @ts-ignore
      await createCommunity(
        // @ts-ignore
        id,
        name,
        slug,
        logo_url || image_url,
        'org bio',
        created_by
      )

      return res.status(201).json({ message: 'Community created' })
    } catch (err) {
      console.log(err)

      throw new ApiError(500, 'Internal Server Error')
    }
  }

  // Listen organization invitation creation event.
  // Just to show. You can avoid this or tell people that we can create a new mongoose action and
  // add pending invites in the database.
  if (eventType === 'organizationInvitation.created') {
    try {
      // Resource: https://clerk.com/docs/reference/backend-api/tag/Organization-Invitations#operation/CreateOrganizationInvitation
      console.log('Invitation created', evnt?.data)

      return res.status(201).json({ message: 'Invitation created' })
    } catch (err) {
      console.log(err)

      throw new ApiError(500, 'Internal Server Error')
    }
  }

  // Listen organization membership (member invite & accepted) creation
  if (eventType === 'organizationMembership.created') {
    try {
      // Resource: https://clerk.com/docs/reference/backend-api/tag/Organization-Memberships#operation/CreateOrganizationMembership
      // Show what evnt?.data sends from above resource
      const { organization, public_user_data } = evnt?.data
      console.log('created', evnt?.data)

      // @ts-ignore
      await addMemberToCommunity(organization.id, public_user_data.user_id)

      return res.status(201).json({ message: 'Invitation accepted' })
    } catch (err) {
      console.log(err)

      throw new ApiError(500, 'Internal Server Error')
    }
  }

  // Listen member deletion event
  if (eventType === 'organizationMembership.deleted') {
    try {
      // Resource: https://clerk.com/docs/reference/backend-api/tag/Organization-Memberships#operation/DeleteOrganizationMembership
      // Show what evnt?.data sends from above resource
      const { organization, public_user_data } = evnt?.data
      console.log('removed', evnt?.data)

      // @ts-ignore
      await removeUserFromCommunity(public_user_data.user_id, organization.id)

      return res.status(201).json({ message: 'Member removed' })
    } catch (err) {
      console.log(err)

      throw new ApiError(500, 'Internal Server Error')
    }
  }

  // Listen organization updation event
  if (eventType === 'organization.updated') {
    try {
      // Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/UpdateOrganization
      // Show what evnt?.data sends from above resource
      const { id, logo_url, name, slug } = evnt?.data
      console.log('updated', evnt?.data)

      // @ts-ignore
      await updateCommunityInfo(id, name, slug, logo_url)

      return res.status(201).json({ message: 'Member removed' })
    } catch (err) {
      console.log(err)

      throw new ApiError(500, 'Internal Server Error')
    }
  }

  // Listen organization deletion event
  if (eventType === 'organization.deleted') {
    try {
      // Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/DeleteOrganization
      // Show what evnt?.data sends from above resource
      const { id } = evnt?.data
      console.log('deleted', evnt?.data)

      // @ts-ignore
      await deleteCommunity(id)

      return res.status(201).json({ message: 'Organization deleted' })
    } catch (err) {
      console.log(err)

      throw new ApiError(500, 'Internal Server Error')
    }
  }

  // If the event type is not found
  res.status(400).json({ message: 'Invalid event type' })
})

export const getCommunityDetails = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const communityDetails = await Community.findOne({ clerkId: req.params.clerkId }).populate([
    'createdBy',
    {
      path: 'members',
      model: User,
      select: 'name username image _id clerkId'
    }
  ])

  if (!communityDetails) {
    throw new ApiError(404, 'Community not found')
  }

  res.status(200).json(communityDetails)
})

export const getCommunityPosts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const communityPosts = await Community.findOne({ clerkId: req.params.clerkId }).populate({
    path: 'threads',
    model: Thread,
    populate: [
      {
        path: 'author',
        model: User,
        select: 'name image clerkId _id'
      },
      {
        path: 'community',
        model: Community,
        select: 'name clerkId image _id createdAt'
      },
      {
        path: 'children',
        model: Thread,
        populate: {
          path: 'author',
          model: User,
          select: 'image clerkId _id'
        }
      }
    ]
  })

  if (!communityPosts) {
    throw new ApiError(404, 'Community not found')
  }

  res.status(200).json(communityPosts)
})

interface GetCommunitiesRequest extends Request {
  query: {
    searchString?: string
    page?: string
    limit?: string
    sortBy?: string
  }
}

export const getCommunities = asyncHandler(async (req: GetCommunitiesRequest, res: Response, next: NextFunction) => {
  const { searchString = '', page = '1', limit = '20', sortBy = 'desc' } = req.query
  const skip = (parseInt(page) - 1) * parseInt(limit)

  const regex = new RegExp(searchString, 'i')

  const query: FilterQuery<typeof Community> = {}

  if (searchString.trim() !== '') {
    query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }]
  }

  const [totalCommunitiesCount, communities] = await Promise.all([
    Community.countDocuments(query),
    Community.find(query)
      .sort({ createdAt: sortBy as SortOrder })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('members')
  ])

  const isNext = totalCommunitiesCount > skip + communities.length

  res.status(200).json({ communities, isNext })
})
