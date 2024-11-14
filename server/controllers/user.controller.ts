import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { hasResourcePermission } from '../middlewares/auth.middleware'
import ApiError from '../utils/ApiError'
import User from '../models/user.model'
import Thread from '../models/thread.model'
import { FilterQuery, SortOrder } from 'mongoose'

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

export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { clerkId } = req.params

  const user = await User.findOne({ clerkId })

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  res.status(200).json(user)
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
