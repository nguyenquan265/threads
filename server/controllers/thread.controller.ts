import Thread from '../models/thread.model'
import User from '../models/user.model'
import ApiError from '../utils/ApiError'
import asyncHandler from '../utils/asyncHandler'
import { NextFunction, Request, Response } from 'express'

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
