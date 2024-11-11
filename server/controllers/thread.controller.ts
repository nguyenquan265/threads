import Thread from '../models/thread.model'
import User from '../models/user.model'
import ApiError from '../utils/ApiError'
import asyncHandler from '../utils/asyncHandler'
import { NextFunction, Request, Response } from 'express'

interface GetThreadsRequest extends Request {
  query: {
    page: string
    limit: string
  }
}

export const getThreads = asyncHandler(async (req: GetThreadsRequest, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 20
  const skip = (page - 1) * limit

  // Get all top-level threads
  const query = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({ path: 'author', model: User })
    .populate({
      path: 'children',
      populate: {
        path: 'author',
        model: User,
        select: '_id name parentId image'
      }
    })

  const [totalPosts, posts] = await Promise.all([
    Thread.countDocuments({ parentId: { $in: [null, undefined] } }),
    query
  ])
  const isNext = totalPosts > skip + posts.length

  res.status(200).json({ posts, isNext })
})

interface CreateThreadRequest extends Request {
  body: {
    text: string
    author: string
    communityId: string | null
  }
}

export const createThread = asyncHandler(async (req: CreateThreadRequest, res: Response, next: NextFunction) => {
  const { text, author, communityId } = req.body

  if (!text || !author) {
    throw new ApiError(400, 'Text and author are required.')
  }

  const thread = await Thread.create({
    text,
    author,
    community: communityId
  })

  await User.findByIdAndUpdate(author, { $push: { threads: thread._id } })

  res.status(201).json(thread)
})

export const getThreadByID = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const thread = await Thread.findById(req.params.id)
    .populate({ path: 'author', model: User })
    .populate({ path: 'children', populate: { path: 'author', model: User } })

  if (!thread) {
    throw new ApiError(404, 'Thread not found.')
  }

  res.status(200).json(thread)
})
