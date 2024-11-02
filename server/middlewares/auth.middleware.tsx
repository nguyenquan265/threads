import ApiError from '@/utils/ApiError'
import { getAuth } from '@clerk/express'
import { NextFunction, Request, Response } from 'express'

const hasPermission = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req)

  if (!auth.has({ permission: 'org:admin' })) {
    throw new ApiError(403, 'You do not have permission to access this resource')
  }

  return next()
}

export default hasPermission
