import { NextFunction, Request, Response } from 'express'
import { Error as MongoError } from 'mongoose'
import ApiError from '../utils/ApiError'

const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorCode = 500
  let errorMsg = 'Something went wrong.'

  console.log('****************')
  console.log('****************')
  console.log(error)
  console.log('****************')
  console.log('****************')

  if (error instanceof ApiError) {
    errorCode = error.statusCode
    errorMsg = error.message
  }

  if (error instanceof MongoError) {
    errorCode = 400
    errorMsg = error.message

    if (error instanceof MongoError.CastError) {
      errorMsg = `Invalid ${error.path}: ${error.value}.`
    }

    if (error instanceof MongoError.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message)
      errorMsg = `Invalid input. ${errors.join(' ')}`
    }
  }

  res.status(errorCode).json({ error: errorMsg })
}

export default errorHandler
