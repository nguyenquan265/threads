import { getAuth } from '@clerk/express'
import { NextFunction, Request, Response } from 'express'

const hasPermission = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req)

  if (!auth.has({ permission: 'org:admin' })) {
    return res.status(403).send('Forbidden')
  }

  return next()
}

export default hasPermission
