import { NextFunction, Request, Response } from 'express'

// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const auth = getAuth(req)

//   if (!auth.userId) {
//     next(new ApiError(401, 'You must be logged in to access this resource'))
//   }

//   req.auth = auth
//   next()
// }

// export const restrictTo = (...roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const auth = getAuth(req)

//     console.log(auth)

//     if (!auth.has({ permission: `org:admin` })) {
//       throw new ApiError(403, 'You do not have permission to access this resource')
//     }

//     next()
//   }
// }

export const hasResourcePermission = (req: Request, resourceId: string) => {
  if (!req.auth) {
    return false
  }

  if (req.auth.has({ permission: 'org:admin' })) {
    return true
  }

  return req.auth.userId === resourceId
}
