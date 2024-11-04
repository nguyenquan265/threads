import ApiError from '@/utils/ApiError'
import asyncHandler from '@/utils/asyncHandler'
import { NextFunction, Request, Response } from 'express'

export const authenticate = asyncHandler((req: Request, res: Response, next: NextFunction) => {
  if (!req.auth?.userId) {
    throw new ApiError(401, 'You must be logged in to access this resource')
  }

  return next()
})

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.auth

    if (auth) {
      roles.forEach((role) => {
        if (!auth.has({ permission: `org:${role}` })) {
          throw new ApiError(403, 'You do not have permission to access this resource')
        }
      })
    }

    next()
  }
}

export const hasResourcePermission = (req: Request, resourceId: string) => {
  const auth = req.auth

  if (!auth) {
    return false
  }

  if (auth.has({ permission: 'org:admin' })) {
    return true
  }

  return auth.userId === resourceId
}
