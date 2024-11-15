import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { hasResourcePermission } from '../middlewares/auth.middleware'
import ApiError from '../utils/ApiError'
import User from '../models/user.model'
import Thread from '../models/thread.model'
import { FilterQuery, SortOrder } from 'mongoose'

interface GetUserRequest extends Request {
  query: {
    userId: string
    page?: string
    limit?: string
    searchString?: string
    sortBy?: string
  }
}

export const getUsers = asyncHandler(async (req: GetUserRequest, res: Response, next: NextFunction) => {
  const { userId, page, limit, searchString, sortBy } = req.query
  const skip = ((page ? parseInt(page) : 1) - 1) * (limit ? parseInt(limit) : 20)

  const regex = new RegExp(searchString || '', 'i')

  const query: FilterQuery<typeof User> = {
    clerkId: { $ne: userId }
  }

  if (searchString?.trim() !== '') {
    query.$or = [
      {
        username: { $regex: regex }
      },
      {
        name: { $regex: regex }
      }
    ]
  }

  const [totalUsers, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .sort({ createdAt: sortBy ? (sortBy as SortOrder) : 'desc' })
      .skip(skip)
      .limit(limit ? parseInt(limit) : 20)
  ])

  const isNext = totalUsers > skip + users.length

  res.status(200).json({ users, isNext })
})

export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { clerkId } = req.params

  const user = await User.findOne({ clerkId })

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  res.status(200).json(user)
})

interface UpdateUserRequest extends Request {
  body: {
    username: string
    name: string
    bio: string
    profile_photo: string
  }
}

export const updateUser = asyncHandler(async (req: UpdateUserRequest, res: Response, next: NextFunction) => {
  const { clerkId } = req.params

  if (!hasResourcePermission(req, clerkId)) {
    throw new ApiError(403, 'You do not have permission to access this resource')
  }

  const user = await User.findOneAndUpdate(
    { clerkId },
    {
      username: req.body.username.toLowerCase(),
      name: req.body.name,
      bio: req.body.bio,
      image: req.body.profile_photo,
      onboarded: true
    },
    { upsert: true }
  )

  res.status(200).json({
    status: 'success',
    data: user
  })
})

export const getUserPosts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { clerkId } = req.params

  const userPosts = await User.findOne({ clerkId }).populate({
    path: 'threads',
    model: Thread,
    populate: [
      { path: 'children', model: Thread },
      {
        path: 'author',
        model: User,
        select: 'clerkId name image'
      }
    ]
  })

  if (!userPosts) {
    throw new ApiError(404, 'User not found')
  }

  res.status(200).json(userPosts)
})

export const getUserActivities = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { objectId } = req.params

  // find all threads created by the user
  const userPosts = await Thread.find({ author: objectId })

  // collect all the thread ids (replies) from the 'children' field
  const childPostIds = userPosts.reduce((acc, post) => {
    return acc.concat(post.children)
  }, [])

  const replies = await Thread.find({ _id: { $in: childPostIds }, author: { $ne: objectId } }).populate({
    path: 'author',
    model: User,
    select: '_id clerkId name image'
  })

  res.status(200).json(replies)
})
