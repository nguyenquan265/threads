import Community from '../models/community.model'
import Thread from '../models/thread.model'
import User from '../models/user.model'
import ApiError from '../utils/ApiError'
import asyncHandler from '../utils/asyncHandler'
import { NextFunction, Request, Response } from 'express'

interface GetThreadsRequest extends Request {
  query: {
    page?: string
    limit?: string
  }
}

export const getThreads = asyncHandler(async (req: GetThreadsRequest, res: Response, next: NextFunction) => {
  const { page = '1', limit = '20' } = req.query
  const skip = (parseInt(page) - 1) * parseInt(limit)

  // Get all top-level threads
  const query = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate({ path: 'author', model: User })
    .populate({
      path: 'community',
      model: Community
    })
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

  const community = await Community.findOne({ clerkId: communityId }, { _id: 1 })

  const thread = await Thread.create({
    text,
    author,
    community: community ? community._id : null
  })

  await User.findByIdAndUpdate(author, { $push: { threads: thread._id } })

  if (community) {
    await Community.findByIdAndUpdate(community._id, { $push: { threads: thread._id } })
  }

  res.status(201).json(thread)
})

export const getThreadByID = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const thread = await Thread.findById(req.params.id)
    .populate({ path: 'author', model: User, select: '_id clerkId name image' })
    .populate({
      path: 'community',
      model: Community,
      select: '_id clerkId name image'
    })
    .populate({
      path: 'children',
      populate: [
        {
          path: 'author', // Populate the author field within children
          model: User,
          select: '_id clerkId name image' // Select only _id and username fields of the author
        },
        {
          path: 'children', // Populate the children field within children
          model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
          populate: {
            path: 'author', // Populate the author field within nested children
            model: User,
            select: '_id clerkId name image' // Select only _id and username fields of the author
          }
        }
      ]
    })

  if (!thread) {
    throw new ApiError(404, 'Thread not found.')
  }

  res.status(200).json(thread)
})

interface AddCommentToThreadRequest extends Request {
  body: {
    commentText: string
    userId: string
  }
}

export const addCommentToThread = asyncHandler(
  async (req: AddCommentToThreadRequest, res: Response, next: NextFunction) => {
    // find original thread by id
    const originThread = await Thread.findById(req.params.id)

    if (!originThread) {
      throw new ApiError(404, 'Thread not found.')
    }

    // create new comment thread
    const commentThread = await Thread.create({
      text: req.body.commentText,
      author: req.body.userId,
      parentId: req.params.id
    })

    // update original thread to include new comment
    originThread.children.push(commentThread._id)
    await originThread.save()

    res.status(201).json(commentThread)
  }
)
