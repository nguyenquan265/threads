import ApiError from '@/utils/ApiError'
import { NextFunction, Request, Response } from 'express'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth || !req.auth.userId) {
    next(new ApiError(401, 'You must be logged in to access this resource'))
  }

  next()
}

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    roles.forEach((role) => {
      if (req.auth && !req.auth.has({ permission: `org:${role}` })) {
        next(new ApiError(403, 'You do not have permission to access this resource'))
      }
    })

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
