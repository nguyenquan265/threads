// import ApiError from '@/utils/ApiError'
// import { checkBase64Image, getBase64Size } from '@/utils/base64ImageTest'
import { NextFunction, Request, Response } from 'express'
import multer, { FileFilterCallback } from 'multer'
import ApiError from '../utils/ApiError'
import { checkBase64Image, getBase64Size } from '../utils/base64ImageTest'

const storage = multer.memoryStorage()

const multerFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export const multerUploader = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: multerFilter
})

interface UploadBase64ImageRequest extends Request {
  body: {
    image: string
  }
}

export const base64ImageUploader = (req: UploadBase64ImageRequest, res: Response, next: NextFunction) => {
  const image = req.body.image

  if (!image) {
    next(new ApiError(400, 'Please provide a base64 image'))
  }

  if (!checkBase64Image(image)) {
    next(new ApiError(400, 'Please provide a valid base64 image'))
  }

  if (getBase64Size(image) > 5) {
    next(new ApiError(400, 'Image size must be less than 5MB'))
  }

  next()
}
