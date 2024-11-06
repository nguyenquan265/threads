// import { hasResourcePermission } from '@/middlewares/auth.middleware'
// import User from '@/models/user.model'
// import ApiError from '@/utils/ApiError'
// import asyncHandler from '@/utils/asyncHandler'
import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { hasResourcePermission } from '../middlewares/auth.middleware'
import ApiError from '../utils/ApiError'
import User from '../models/user.model'

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
